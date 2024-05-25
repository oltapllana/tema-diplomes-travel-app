import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DownArrow from "../assets/DownArrow";
import { io } from "socket.io-client";
import { useSocket } from "../SocketsContext";
import Notification from "../assets/Notification";
import Notifications from "./Notifications";
import { FaUserCircle } from "react-icons/fa";

export default function MainHeader(props) {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");
  const [isLoggedin, setIsLoggedin] = useState(authToken);
  const [profile, setProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    const fetchhh = async () => {
      const response = await fetchUserProfile();
      if (response.error) {
        return;
      }
      setProfile(response);
    };
    if (isLoggedin) {
      fetchhh();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/profile/${localStorage.getItem("id")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/notifications/${localStorage.getItem("id")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
        setIsLoading(false);
      }

      const notifications = await response.json();
      setNotifications(notifications);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
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
          <li>
            <div
              onClick={() => {
                setIsNotificationOpen((prevState) => !prevState);
                fetchNotifications();
              }}
            >
              <Notification />
            </div>
          </li>
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
            {isLoggedin && profile.profilePicture && (
              <img
                onClick={() => setIsDropdownOpen((prevState) => !prevState)}
                src={require(`../../../Backend/uploads/${profile.profilePicture}`)}
                alt="test"
              />
            )}
            {isLoggedin && !profile.profilePicture && (
              <FaUserCircle
                size={30}
                onClick={() => setIsDropdownOpen((prevState) => !prevState)}
              />
            )}
            {isDropdownOpen && (
              <div className="user-profile-dropdown">
                <span onClick={() => navigate("/profile")}>See profile</span>
                <span
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    setIsLoggedin(false);
                    navigate("/login-register");
                  }}
                >
                  Logout
                </span>
              </div>
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
      {isNotificationOpen && (
        <Notifications notifications={notifications} isLoading={isLoading} />
      )}
    </header>
  );
}
