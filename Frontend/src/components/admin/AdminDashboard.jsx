import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/main.css";
import "../../styles/admin.css";
import UsersList from "./UsersList";
import LeftNavigation from "./LeftNavigation";
import MainHeader from "../MainHeader";
import PlacesList from "./PlacesList";
import AdminBookings from "./AdminBookings";
import AddPlaces from "./AddPlaces";
import AddPlacesDetails from "./AddPlacesDetails";

export default function AdminDashboard() {
  const userRole = useSelector((state) => state.user.role);
  const [isUserDashboard, setIsUserDashboard] = useState(true);
  const [isPlacesList, setIsPlacesList] = useState(false);
  const [isAddNewPlaces, setIsAddNewPlaces] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [place, setPlace] = useState(null);
  const [showAddPlacesDetails, setShowAddPlacesDetails] = useState(false);

  return (
    <>
      <MainHeader />
      <div className="grid-2 admin-wrapper">
        <div className="left-navigation">
          <span
            className={`cursor ${isUserDashboard ? "active" : ""}`}
            onClick={() => {
              setIsUserDashboard(true);
              setShowAddPlacesDetails(false);
              setIsAddNewPlaces(false);
              setIsPlacesList(false);
              setIsBooking(false);
            }}
          >
            Paneli i përdoruesit
          </span>
          <span
            className={`cursor ${isPlacesList ? "active" : ""}`}
            onClick={() => {
              setIsPlacesList(true);
              setShowAddPlacesDetails(false);
              setIsAddNewPlaces(false);
              setIsUserDashboard(false);
              setIsBooking(false);
            }}
          >
            Lista e vendeve
          </span>
          <span
            className={`cursor ${isAddNewPlaces ? "active" : ""}`}
            onClick={() => {
              setIsAddNewPlaces(true);
              setShowAddPlacesDetails(false);
              setIsBooking(false);
              setIsPlacesList(false);
              setIsUserDashboard(false);
            }}
          >
            Shto një vend të ri
          </span>
          <span
            className={`cursor ${isBooking ? "active" : ""}`}
            onClick={() => {
              setIsBooking(true);
              setShowAddPlacesDetails(false);
              setIsAddNewPlaces(false);
              setIsPlacesList(false);
              setIsUserDashboard(false);
            }}
          >
            Rezervimet
          </span>
        </div>
        {isUserDashboard && <UsersList />}
        {isPlacesList && <PlacesList />}
        {isBooking && <AdminBookings />}
        {isAddNewPlaces && (
          <div className="user-dashboard">
            <AddPlaces
              place={place}
              setPlace={setPlace}
              setShowAddPlacesDetails={setShowAddPlacesDetails}
            />
            {showAddPlacesDetails && <AddPlacesDetails place={place} />}
          </div>
        )}
      </div>
    </>
  );
}
