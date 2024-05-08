import React, { useState } from "react";
import Bookmark from "../../assets/Bookmark";
import Modal from "./../Modal";
import Availability from "./Availability";
import BookTicket from "../user/BookTicket";

const PlaceDetails = ({ place, setShowPlaceDetails }) => {
  const role = localStorage.getItem("role");
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [thing, setThing] = useState(null);
  const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);
  const [tickets, setTickets] = useState(0);
  const [placeId, setPlaceId] = useState(null);
  const [placeTicket, setPlaceTicket] = useState(null);
  const [placeDetails, setPlaceDetails] = useState({});

  const addToWishlist = async (thing) => {
    const response = await fetch("http://localhost:3000/travel-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cityId: place._id,
        city: place.city,
        userId: localStorage.getItem("id"),
        placePlan: {
          id: thing.id,
          text: thing.text,
          image: thing.image,
          place: thing.place,
          price: thing.price,
        },
      }),
    });

    if (response.status === 409) {
      setErrorMessage("You've already added this place to your wishlist.");
      setError(true);
    }
  };

  const checkAvailability = async (placeId) => {
    setOpenAvailabilityModal(true);
    const getAvailability = async () => {
      const response = await fetch(
        `http://localhost:3000/availability/${place._id}/${placeId}`
      );
      return response.json();
    };
    const availability = await getAvailability();
    setTickets(availability.ticketsLeft);
  };

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
                      {role === "user" && (
                        <span
                          className="cursor-pointer"
                          onClick={() => addToWishlist(thing)}
                        >
                          <Bookmark />
                        </span>
                      )}
                    </span>
                  </div>
                  <img
                    src={require(`../../../../Backend/uploads/${thing.image}`)}
                    alt={place.title}
                  />
                  <h2 className="margin-bottom-10">{thing.text}</h2>
                  {role === "admin" && (
                    <button
                      className="availability-btn"
                      onClick={() => {
                        setThing(thing);
                        setAvailability(true);
                      }}
                    >
                      Set Availability
                    </button>
                  )}

                  <div className="flex flex-end">
                    <span>{thing.price}</span>
                  </div>
                  {role === "user" && (
                    <button
                      className="btn pink-btn"
                      onClick={() => {
                        setPlaceTicket(thing.place);
                        setPlaceId(thing.id);
                        setOpenAvailabilityModal(true);
                        checkAvailability(thing.id);
                        setPlaceDetails(thing);
                      }}
                    >
                      Book now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {role === "admin" && availability && (
        <Availability
          placeId={place._id}
          thingToDo={thing}
          setAvailability={setAvailability}
          availability={availability}
        />
      )}
      {role === "user" && openAvailabilityModal && (
        <BookTicket
          openAvailabilityModal={openAvailabilityModal}
          setOpenAvailabilityModal={setOpenAvailabilityModal}
          tickets={tickets}
          item={placeDetails}
        />
      )}
      {error && (
        <Modal isDisplay={error} setIsDisplay={setError}>
          <p>{errorMessage}</p>
        </Modal>
      )}
    </>
  );
};

export default PlaceDetails;
