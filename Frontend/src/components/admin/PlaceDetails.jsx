import React, { useState } from "react";
import Bookmark from "../../assets/Bookmark";

const PlaceDetails = ({ place, setShowPlaceDetails }) => {
  console.log("place", place);
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className="user-dashboard">
      <button
        className="book-btn unset-width margin-bottom-10"
        onClick={() => setShowPlaceDetails(false)}
      >
        Back to places list
      </button>
      <div className="place-detailss margin-bottom-20">
        <img
          src={require(`../../../../Backend/uploads/${place.image}`)}
          alt={place.title}
        />
        <div className="flex column-direction">
          <h1>{place.title}</h1>
          <p>{place.description}</p>
        </div>
      </div>
      <div>
        <h2 className="bold">Places that we will visit with package are:</h2>
        <div className="grid-3 margin-top-10">
          {place.thingstodo.map((thing) => {
            return (
              <div className="flex column-direction place-wrapper white-bg">
                <div className="flex space-between">
                  <h1 className="margin-0">{thing.place}</h1>
                  <span
                    onClick={() => {
                      setIsSaved(true);
                    }}
                  >
                    {/* <Bookmark color={isSaved ? "yellow" : ""} /> */}
                    <Bookmark />
                  </span>
                </div>
                <img
                  src={require(`../../../../Backend/uploads/${thing.image}`)}
                  alt={place.title}
                />
                <h2>{thing.text}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
