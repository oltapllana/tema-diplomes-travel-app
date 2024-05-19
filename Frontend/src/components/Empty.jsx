import React from "react";
import NoResults from "../assets/NoResults";

const Empty = () => {
  return (
    <div className="empty-wrapper">
      <NoResults />
      <p>No results found</p>
    </div>
  );
};

export default Empty;
