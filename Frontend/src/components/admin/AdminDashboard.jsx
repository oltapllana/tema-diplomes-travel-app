import React, { useState } from "react";
import "../../styles/main.css";
import "../../styles/admin.css";
import UsersList from "./UsersList";
import MainHeader from "../MainHeader";
import PlacesList from "./PlacesList";
import AdminBookings from "./AdminBookings";
import AddPlaces from "./AddPlaces";
import AddPlacesDetails from "./AddPlacesDetails";
import { FaBars } from "react-icons/fa"; // Import a hamburger icon

export default function AdminDashboard() {
  const [isUserDashboard, setIsUserDashboard] = useState(true);
  const [isPlacesList, setIsPlacesList] = useState(false);
  const [isAddNewPlaces, setIsAddNewPlaces] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [place, setPlace] = useState(null);
  const [showAddPlacesDetails, setShowAddPlacesDetails] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const setActiveSection = (section) => {
    setIsUserDashboard(section === "dashboard");
    setIsPlacesList(section === "places");
    setIsAddNewPlaces(section === "add");
    setIsBooking(section === "bookings");
    setShowAddPlacesDetails(false);
    setIsHamburgerOpen(false);
  };

  const renderAdminMenu = (menuClassName, onItemClick) => (
    <div className={menuClassName}>
      <span
        className={`cursor ${isUserDashboard ? "active" : ""}`}
        onClick={() => {
          setActiveSection("dashboard");
          if (onItemClick) onItemClick();
        }}
      >
        Paneli i përdoruesit
      </span>
      <span
        className={`cursor ${isPlacesList ? "active" : ""}`}
        onClick={() => {
          setActiveSection("places");
          if (onItemClick) onItemClick();
        }}
      >
        Lista e vendeve
      </span>
      <span
        className={`cursor ${isAddNewPlaces ? "active" : ""}`}
        onClick={() => {
          setActiveSection("add");
          if (onItemClick) onItemClick();
        }}
      >
        Shto një vend të ri
      </span>
      <span
        className={`cursor ${isBooking ? "active" : ""}`}
        onClick={() => {
          setActiveSection("bookings");
          if (onItemClick) onItemClick();
        }}
      >
        Rezervimet
      </span>
    </div>
  );

  return (
    <>
      <MainHeader />
      <div className="grid-2 admin-wrapper">
        <aside className="left-navigation admin-left-navigation">
          <div
            className="hamburger admin-mobile-only"
            onClick={() => setIsHamburgerOpen((prev) => !prev)}
          >
            <FaBars />
          </div>

          {renderAdminMenu("admin-navigation-desktop")}

          {isHamburgerOpen && renderAdminMenu("admin-navigation-dropdown")}
        </aside>
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
