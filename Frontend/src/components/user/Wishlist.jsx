import React, { useEffect, useState } from "react";
import MainHeader from "./../MainHeader";
import Modal from "./../Modal";
import BookTicket from "./BookTicket";

const Wishlist = () => {
  const [travelPlans, setTravelPlans] = useState([]);
  const [tickets, setTickets] = useState(0);
  const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);
  const [placeTicket, setPlaceTicket] = useState(null);
  const [placeId, setPlaceId] = useState(null);

  const fetchTravelPlans = async () => {
    try {
      const response = await fetch("http://localhost:3000/travel-plans");
      if (!response.ok) {
        throw new Error("Failed to fetch travel plans");
      }
      const data = await response.json();
      setTravelPlans(data);
    } catch (error) {
      console.error("Error fetching travel plans:", error);
    }
  };

  const handleDelete = async ({ planId, placeId }) => {
    const response = await fetch(
      `http://localhost:3000/travel-plans/${planId}/${placeId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      return;
    }
    fetchTravelPlans();
  };

  const checkAvailability = async (planId, placeId) => {
    setOpenAvailabilityModal(true);
    const getAvailability = async () => {
      const response = await fetch(
        `http://localhost:3000/availability/${planId}/${placeId}`
      );
      return response.json();
    };
    const availability = await getAvailability();
    setTickets(availability.ticketsLeft);
  };

  console.log("-----------------------------------", tickets);

  useEffect(() => {
    fetchTravelPlans();
  }, []);

  return (
    <>
      <MainHeader />
      <div className="container">
        {travelPlans.map((plan) => {
          console.log(plan);
          return (
            <div className="wishlist-item-wrapper">
              <h2>{plan.city.toUpperCase()}</h2>
              {plan.placePlan.map((place) => {
                console.log(place);
                return (
                  <div className="wishlist-item margin-bottom-20">
                    <h1>{place.place}</h1>
                    <div className="flex gap-20">
                      <div>
                        <img
                          src={require(`../../../../Backend/uploads/${place.image}`)}
                          alt={place.place}
                        />
                      </div>
                      <div className="flex column-direction full-width">
                        <p>{place.text}</p>
                        <span className="flex flex-end align-end full-height">
                          {place.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-end gap-5">
                      <button
                        className="btn white-btn"
                        onClick={() =>
                          handleDelete({ planId: plan._id, placeId: place.id })
                        }
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setPlaceTicket(place.place);
                          checkAvailability(plan.cityId, place.id);
                          setPlaceId(place.id)
                        }}
                        className="btn pink-btn"
                      >
                        Check availability
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {openAvailabilityModal && (
        <BookTicket
          openAvailabilityModal={openAvailabilityModal}
          setOpenAvailabilityModal={setOpenAvailabilityModal}
          tickets={tickets}
          placeTicket={placeTicket}
          placeId={placeId}
        />
      )}
    </>
  );
};

export default Wishlist;
