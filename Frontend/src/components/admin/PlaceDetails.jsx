import React, { useState } from "react";
import Bookmark from "../../assets/Bookmark";
import Modal from "./../Modal";

const PlaceDetails = ({ place, setShowPlaceDetails }) => {
  console.log("place", place);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const addToWishlist = async (thing) => {
    const response = await fetch("http://localhost:3000/travel-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: place.city,
        placePlan: {
          id: thing.id,
          text: thing.text,
          image: thing.image,
          place: thing.place,
          price: thing.prices,
        },
      }),
    });
    console.log(response);
    if (response.status === 409) {
      console.log(response);
      setErrorMessage("You've already added this place to your wishlist.");
      setError(true);
    }
  };

  console.log(error);
  console.log(errorMessage);
  return (
    <>
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
                      <span
                        className="cursor-pointer"
                        onClick={() => addToWishlist(thing)}
                      >
                        <Bookmark />
                      </span>
                    </span>
                  </div>
                  <img
                    src={require(`../../../../Backend/uploads/${thing.image}`)}
                    alt={place.title}
                  />
                  <h2>{thing.text}</h2>
                  <div className="flex flex-end">
                    <span>{thing.prices}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {error && (
        <Modal isDisplay={error} setIsDisplay={setError}>
          <p>{errorMessage}</p>
        </Modal>
      )}
    </>
  );
};

export default PlaceDetails;
