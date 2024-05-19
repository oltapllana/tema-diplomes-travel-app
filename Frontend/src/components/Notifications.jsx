import React from "react";
import { parseISO, format } from "date-fns";

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications-wrapper">
      {notifications.map((notification) => (
        <div className="notification-item">
          <img
            src={require(`../../../Backend/uploads/${notification.bookingDetails.image}`)}
          />
          <div className="details">
            <span>
              {notification.admin} {notification.message} booking to{" "}
              {notification.bookingDetails.place}
            </span>
            <span className="date">
              {format(parseISO(notification.date), "MMMM d, yyyy, h:mm a")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
