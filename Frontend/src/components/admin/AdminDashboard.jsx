import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/main.css";
import "../../styles/admin.css";
import UsersList from "./UsersList";
import LeftNavigation from "./LeftNavigation";
import MainHeader from "../MainHeader";
import PlacesList from "./PlacesList";

export default function AdminDashboard() {
  const userRole = useSelector((state) => state.user.role);
  const [isUserDashboard, setIsUserDashboard] = useState(true);
  const [isAddPlaces, setIsAddPlaces] = useState(false);

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
            }}
          >
            User Dashboard
          </span>
          <span
            className={`cursor ${isAddPlaces ? "active" : ""}`}
            onClick={() => {
              setIsAddPlaces(true);
              setIsUserDashboard(false);
            }}
          >
            Add places
          </span>
        </div>
        {isUserDashboard && <UsersList />}
        {isAddPlaces && <PlacesList />}
      </div>
    </>
  );
}
