import React, { useState } from "react";

const LeftNavigation = () => {
  const [isUserDashboard, setIsUserDashboard] = useState(true);
  const [isAddPlaces, setIsAddPlaces] = useState(false);
  const leftNavigationMenu = ["User Dashboard", "Add places"];
  return (
    <div className="left-navigation">
      <span onClick={() => setIsUserDashboard(true)}>User Dashboard</span>
      <span onClick={() => setIsAddPlaces(true)}>Add places</span>
    </div>
  );
};

export default LeftNavigation;
