import React, { useState, useEffect } from "react";
import MainHeader from "../MainHeader";
import Clock from "../../assets/user/Clock";
import Ticket from "../../assets/user/Ticket";
import Price from "../../assets/user/Price";
import Edit from "../../assets/user/Edit";
import Delete from "../../assets/user/Delete";
import { io } from "socket.io-client";
import { useSocket } from "../../SocketsContext";
import Empty from "../Empty";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editedHour, setEditedHour] = useState(null);
  const [editedDate, setEditedDate] = useState(null);
  const [editedNumTickets, setEditedNumTickets] = useState(null);
  const [editedBookingId, setEditedBookingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.emit("user", localStorage.getItem("id"));
    socket.on("bookingTerminated", (data) => {
      fetchData();
    });

    return () => {
      socket.off("bookingTerminated", (data) => {
        fetchData();
      });
    };
  }, [socket]);

  const calculateTotalPrice = (data) => {
    let totalPrice = 0;
    data.forEach((item) => {
      const numericValue = parseFloat(item.bookedPlace.prices.replace("$", ""));
      totalPrice += numericValue * item.numTickets;
    });
    setTotalPrice(totalPrice);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://tema-diplomes-travel-app.onrender.com/user/${localStorage.getItem(
          "id"
        )}/bookings`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
        setIsLoading(false);
      }
      const data = await response.json();
      setBookings(data);
      calculateTotalPrice(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (bookingId) => {
    setEditedBookingId(bookingId);
  };

  const handleSave = async () => {
    try {
      const newValues = {};
      if (editedHour !== null) {
        newValues.selectedHour = editedHour;
      }
      if (editedDate !== null) {
        newValues.selectedDate = editedDate;
      }
      if (editedNumTickets !== null) {
        newValues.numTickets = editedNumTickets;
      }

      const response = await fetch(
        `https://tema-diplomes-travel-app.onrender.com/user/${localStorage.getItem(
          "id"
        )}/bookings/${editedBookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValues),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const newBookings = bookings.map((booking) => {
        if (booking._id === editedBookingId) {
          return {
            ...booking,
            ...newValues,
          };
        }
        return booking;
      });

      setBookings(newBookings);
    } catch (error) {
      console.error("Error saving changes:", error);
    }

    setEditedBookingId(null);
    setEditedHour(null);
    setEditedDate(null);
    setEditedNumTickets(null);
  };

  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        `https://tema-diplomes-travel-app.onrender.com/user/${localStorage.getItem(
          "id"
        )}/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      <MainHeader />
      <div className="container grid-3-1">
        <div className="booking-wrapper">
          {bookings.map((booking) => (
            <div className="wishlist-item margin-bottom-20" key={booking._id}>
              <h1>{booking.bookedPlace.place}</h1>
              <div className="flex gap-20">
                <div>
                  <img
                    src={require(`../../../../Backend/uploads/${booking.bookedPlace.image}`)}
                    alt={booking.bookedPlace.place}
                  />
                </div>
                <div className="flex column-direction full-width">
                  <p>{booking.bookedPlace.text}</p>
                  <div className="flex column-direction booking-details">
                    <p className="flex align-center gap-5">
                      <Clock />{" "}
                      {editedBookingId === booking._id ? (
                        <>
                          <input
                            type="time"
                            value={editedHour || booking.selectedHour}
                            onChange={(e) => setEditedHour(e.target.value)}
                          />
                          <input
                            type="date"
                            value={editedDate || booking.selectedDate}
                            onChange={(e) => setEditedDate(e.target.value)}
                          />
                        </>
                      ) : (
                        <span>
                          {booking.selectedHour}{" "}
                          {new Date(booking.selectedDate).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                    <p className="flex align-center gap-5">
                      <Ticket />{" "}
                      {editedBookingId === booking._id ? (
                        <input
                          type="number"
                          value={editedNumTickets || booking.numTickets}
                          onChange={(e) => setEditedNumTickets(e.target.value)}
                        />
                      ) : (
                        <span> {booking.numTickets} tickets</span>
                      )}
                    </p>
                    <p className="flex">
                      <Price /> <span>{booking.bookedPlace.prices}</span>
                    </p>
                  </div>
                  <div className="flex space-between gap-5 align-center booking-footer">
                    <div className="flex booking-btns-wrapper">
                      {!editedBookingId && (
                        <>
                          <button
                            onClick={() => handleEdit(booking._id)}
                            className="booking-btn booking-edit-btn"
                          >
                            <Edit /> Ndrysho
                          </button>
                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="booking-btn booking-delete-btn"
                          >
                            <Delete />
                          </button>
                        </>
                      )}
                      {editedBookingId === booking._id && (
                        <>
                          <button
                            onClick={handleSave}
                            className="booking-btn booking-delete-btn"
                          >
                            Ruaj
                          </button>
                          <button
                            onClick={() => setEditedBookingId(null)}
                            className="booking-btn booking-delete-btn"
                          >
                            Anulo
                          </button>
                        </>
                      )}
                    </div>
                    <span>
                      Cmimi total{" "}
                      {booking.bookedPlace?.prices &&
                        booking.numTickets *
                          +booking.bookedPlace?.prices?.substring(
                            0,
                            booking.bookedPlace?.prices?.length - 1
                          )}
                      {booking.bookedPlace?.price &&
                        booking.numTickets *
                          +booking.bookedPlace?.price?.substring(
                            0,
                            booking.bookedPlace?.price?.length - 1
                          )}
                      $
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!isLoading && bookings.length === 0 && <Empty />}
        </div>
        <div className="total-price-wrapper">
          Çmimi total i rezervimeve tuaj është: {totalPrice}$
          <div className="no-credit-card">Nuk nevojitet karta kreditore</div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
