import React, { useEffect, useState } from "react";
import MainHeader from "./../MainHeader";
import Modal from "./../Modal";
import BookTicket from "./BookTicket";
import Empty from "../Empty";

const Wishlist = () => {
  const [travelPlans, setTravelPlans] = useState([]);
  const [tickets, setTickets] = useState(0);
  const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);
  const [placeTicket, setPlaceTicket] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [placeDetails, setPlaceDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchTravelPlans = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/user/${localStorage.getItem("id")}/travel-plans`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch travel plans");
        setIsLoading(false);
      }
      const data = await response.json();
      setTravelPlans(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching travel plans:", error);
    }
  };

  const handleDelete = async ({ planId, placeId }) => {
    const response = await fetch(
      `http://localhost:3000/user/${localStorage.getItem(
        "id"
      )}/travel-plans/${planId}/${placeId}`,
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
                        Fshij
                      </button>
                      <button
                        onClick={() => {
                          checkAvailability(plan.cityId, place.id);
                          setPlaceTicket(place.place);
                          setPlaceId(place.id);
                          setPlaceDetails(place);
                        }}
                        className="btn pink-btn"
                      >
                        Kontrollo disponueshmërinë
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {!isLoading && travelPlans.length === 0 && <Empty />}
      </div>
      {openAvailabilityModal && (
        <BookTicket
          openAvailabilityModal={openAvailabilityModal}
          setOpenAvailabilityModal={setOpenAvailabilityModal}
          item={placeDetails}
          tickets={tickets}
        />
      )}
    </>
  );
};

export default Wishlist;
