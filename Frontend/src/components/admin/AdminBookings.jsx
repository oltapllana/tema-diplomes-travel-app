import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSocket } from "../../SocketsContext";

const AdminBookings = () => {
  const socket = useSocket();
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState({});
  const [details, setDetails] = useState({ userId: "", bookingId: "" });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookings(data);
        fetchAllUsers(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const fetchAllUsers = async (bookings) => {
    const userIds = bookings.map((booking) => booking.userId);
    const uniqueUserIds = Array.from(new Set(userIds));
    const usersData = {};

    for (const userId of uniqueUserIds) {
      const userData = await getUserById(userId);
      usersData[userId] = userData;
    }

    setUsers(usersData);
  };

  const getUserById = async (userId) => {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const userData = await response.json();
    return userData;
  };

  const handleTerminateBooking = async (bookingId, userId) => {
    setDetails({
      userId,
      bookingId,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/users/${localStorage.getItem(
          "id"
        )}/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );
      console.log("aaaaaaaaaaaaa-------------", response);

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        if (socket) {
          socket.emit("terminateBooking", userId, bookingId);
        }
      } else {
        throw new Error("Failed to terminate booking");
      }
    } catch (error) {
      console.error("Error terminating booking:", error);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="user-list-header">
        <h2>Lista e rezervmieve</h2>
      </div>
      <div className="admin-table">
        <div className="flex users-list user-title">
          <span>Përdoruesi</span>
          <span>Vendi</span>
          <span>Data/Ora</span>
          <span>Biletat</span>
          <span>Cmimi</span>
          <span>Cmimi total</span>
          <span>Veprimet</span>
        </div>
        {bookings.map((booking) => (
          <div className="flex users-list" key={booking._id}>
            <span>
              {users[booking.userId] && users[booking.userId].username}
            </span>
            <div className="flex booking-place-wrapper">
              <img
                src={require(`../../../../Backend/uploads/${booking.bookedPlace.image}`)}
              />
              <span>{booking.bookedPlace.place}</span>
            </div>
            <span>
              {booking.selectedDate} ~ {booking.selectedHour}
            </span>
            <span>{booking.numTickets}</span>
            <span>{booking.bookedPlace.price}</span>
            <span>
              {booking.numTickets *
                +booking.bookedPlace.price.substring(
                  0,
                  booking.bookedPlace.price.length - 1
                )}
              $
            </span>
            <button
              className="btn blue-btn"
              onClick={() =>
                handleTerminateBooking(booking._id, booking.userId)
              }
            >
              Anulo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
