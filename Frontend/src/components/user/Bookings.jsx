import React, { useState, useEffect } from "react";
import MainHeader from "../MainHeader";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookings"); // Assuming your backend is running on localhost:3000
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MainHeader />
      <div>
        <h1>Bookings</h1>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>{'....'}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Bookings;
