import React, { useState } from "react";
import { parseISO, format } from "date-fns";
import Empty from "./Empty";

const Notifications = ({ notifications, isLoading }) => {
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
      {!isLoading && notifications.length === 0 && <Empty />}
    </div>
  );
};

export default Notifications;
