import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DownArrow from "../assets/DownArrow";

export default function MainHeader(props) {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");
  const [isLoggedin, setIsLoggedin] = useState(authToken);
  const [profile, setProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    const fetchhh = async (username) => {
      const response = await fetchUserProfile(username);
      if (response.error) {
        return;
      }
      setProfile(response);
    };
    if (isLoggedin) {
      fetchhh(username);
    }
  }, []);

  const fetchUserProfile = async (username) => {
    try {
      const response = await fetch("http://localhost:3000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userProfile = await response.json();
      return userProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  return (
    <header className="travel-header">
      {profile?.role === "user" && (
        <ul>
          <li>
            <span onClick={() => navigate("/")}>Homepage</span>
          </li>
          <li>
            <span onClick={() => navigate("/places")}>Places</span>
          </li>
          <li>
            <span onClick={() => navigate("/wishlist")}>Wishlist</span>
          </li>
          <li>
            <span onClick={() => navigate("/bookings")}>Bookings</span>
          </li>
          <li>Food</li>
          <li>
            {!isLoggedin && (
              <button
                onClick={() => {
                  props.setIsShown(true);
                  navigate("/login-register");
                }}
              >
                Login
              </button>
            )}
            {isLoggedin && (
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsLoggedin(false);
                  navigate("/login-register");
                }}
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      )}
      {profile?.role === "admin" && (
        <>
          <div
            className="logout-dropdown"
            onClick={() => setIsDropdownOpen((prevState) => !prevState)}
          >
            <div className="profile">
              <span>{profile.username}</span>
              <span>{profile.role}</span>
            </div>
            <div className="dropdown">
              <DownArrow />
            </div>
          </div>
          {isDropdownOpen && (
            <div
              onClick={() => {
                localStorage.removeItem("authToken");
                setIsLoggedin(false);
                navigate("/login-register");
              }}
              className="logout-container"
            >
              Logout
            </div>
          )}
        </>
      )}
    </header>
  );
}
