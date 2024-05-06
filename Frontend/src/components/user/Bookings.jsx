import React, { useState, useEffect } from "react";
import MainHeader from "../MainHeader";
import Clock from "../../assets/user/Clock";
import Ticket from "../../assets/user/Ticket";
import Price from "../../assets/user/Price";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (data) => {
    let totalPrice = 0;

    data.forEach((item) => {
      const numericValue = parseFloat(item.bookedPlace.price.replace("$", ""));
      console.log("item.bookedPlace", item.bookedPlace);
      totalPrice += numericValue * item.numTickets;
    });
    setTotalPrice(totalPrice);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${localStorage.getItem("id")}/bookings`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBookings(data);
        calculateTotalPrice(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MainHeader />
      <div className="container grid-3-1">
        <div className="booking-wrapper">
          {bookings.map((booking) => (
            <div className="wishlist-item margin-bottom-20">
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
                    <p className="flex">
                      <Clock />{" "}
                      <span>
                        {booking.selectedHour}{" "}
                        {new Date(booking.selectedDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex">
                      <Ticket /> <span> {booking.numTickets} tickets</span>
                    </p>
                    <p className="flex">
                      <Price /> <span>{booking.bookedPlace.price}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-end gap-5">
                total price{" "}
                {booking.numTickets *
                  +booking.bookedPlace.price.substring(
                    0,
                    booking.bookedPlace.price.length - 1
                  )}
                $
              </div>
            </div>
          ))}
        </div>
        <div className="total-price-wrapper">
          Total price of your booking is: {totalPrice}$
          <div className="no-credit-card">No credit card needed</div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
