import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/main.css";
import "../../styles/admin.css";
import UsersList from "./UsersList";
import LeftNavigation from "./LeftNavigation";
import MainHeader from "../MainHeader";
import PlacesList from "./PlacesList";
import AdminBookings from "./AdminBookings";

export default function AdminDashboard() {
  const userRole = useSelector((state) => state.user.role);
  const [isUserDashboard, setIsUserDashboard] = useState(true);
  const [isAddPlaces, setIsAddPlaces] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  return (
    <>
      <MainHeader />
      <div className="grid-2 admin-wrapper">
        <div className="left-navigation">
          <span
            className={`cursor ${isUserDashboard ? "active" : ""}`}
            onClick={() => {
              setIsUserDashboard(true);
              setIsAddPlaces(false);
              setIsBooking(false);
            }}
          >
            User Dashboard
          </span>
          <span
            className={`cursor ${isAddPlaces ? "active" : ""}`}
            onClick={() => {
              setIsAddPlaces(true);
              setIsUserDashboard(false);
              setIsBooking(false);
            }}
          >
            Add places
          </span>
          <span
            className={`cursor ${isBooking ? "active" : ""}`}
            onClick={() => {
              setIsBooking(true);
              setIsAddPlaces(false);
              setIsUserDashboard(false);
            }}
          >
            Bookings
          </span>
        </div>
        {isUserDashboard && <UsersList />}
        {isAddPlaces && <PlacesList />}
        {isBooking && <AdminBookings />}
      </div>
    </>
  );
}
