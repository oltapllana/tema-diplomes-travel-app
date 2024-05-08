import React, { useState, useEffect } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState({});

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

  return (
    <div className="user-dashboard">
      <div className="user-list-header">
        <h2>Booking List</h2>
      </div>
      <div className="admin-table">
        <div className="flex users-list user-title">
          <span>User</span>
          <span>Place</span>
          <span>Date/Time</span>
          <span>Tickets</span>
          <span>Price</span>
          <span>Total Price</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
