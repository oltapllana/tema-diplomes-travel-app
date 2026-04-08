import React, { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function ReviewPlaces({ placeId }) {
  const [rating, setRating] = useState(0);

  const handleRatingSubmit = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/places/reviews/${placeId}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ rating }),
        }
      );

      if (response.ok) {
        console.log("Rating submitted successfully");
      } else {
        console.error("Failed to submit rating:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting rating:", error.message);
    }
  };

  return (
    <div>
      <select value={rating} onChange={(e) => setRating(+e.target.value)}>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
      <button onClick={handleRatingSubmit}>Submit Rating</button>
    </div>
  );
}
