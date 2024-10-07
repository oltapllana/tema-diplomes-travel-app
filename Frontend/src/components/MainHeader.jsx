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
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
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
        `https://tema-diplomes-travel-app.onrender.com/profile/${localStorage.getItem(
          "id"
        )}`,
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
        `https://tema-diplomes-travel-app.onrender.com/notifications/${localStorage.getItem(
          "id"
        )}`,
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
        <nav className="navbar">
          <div
            className="hamburger"
            id="hamburger"
            onClick={() => setIsHamburgerMenuOpen((prevState) => !prevState)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {isHamburgerMenuOpen && (
            <ul className="nav-links mobile" id="navLinks">
              <li>
                <span
                  onClick={() => {
                    setIsHamburgerMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Faqja kryesore
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    setIsHamburgerMenuOpen(false);
                    navigate("/places");
                  }}
                >
                  Vendet
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    setIsHamburgerMenuOpen(false);
                    navigate("/wishlist");
                  }}
                >
                  Lista e dëshirave
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    setIsHamburgerMenuOpen(false);
                    navigate("/bookings");
                  }}
                >
                  Rezervimet
                </span>
              </li>
            </ul>
          )}
          <ul className="nav-links web" id="navLinks">
            <li>
              <span
                onClick={() => {
                  navigate("/");
                }}
              >
                Faqja kryesore
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/places");
                }}
              >
                Vendet
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/wishlist");
                }}
              >
                Lista e dëshirave
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/bookings");
                }}
              >
                Rezervimet
              </span>
            </li>
          </ul>
          <div className="notification-profile">
            <div
              className="notification"
              onClick={() => {
                setIsNotificationOpen((prevState) => !prevState);
                fetchNotifications();
              }}
            >
              <Notification />
            </div>

            {!isLoggedin && (
              <button
                onClick={() => {
                  props.setIsShown(true);
                  navigate("/login-register");
                }}
              >
                Kycu
              </button>
            )}
            {isLoggedin && profile.profilePicture && (
              <img
                onClick={() => setIsDropdownOpen((prevState) => !prevState)}
                src={require(`../../../Backend/uploads/${profile.profilePicture}`)}
                alt="Profile"
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
                <span onClick={() => navigate("/profile")}>Shiko profilin</span>
                <span
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    setIsLoggedin(false);
                    navigate("/login-register");
                  }}
                >
                  Ckycu
                </span>
              </div>
            )}
          </div>
        </nav>
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
              Ckycu
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
