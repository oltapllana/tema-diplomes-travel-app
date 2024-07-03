import React, { useContext, useState } from "react";
import { SearchContext } from "../SearchContext";
import MainHeader from "./MainHeader";
import BookTicket from "./user/BookTicket";
import Empty from "./Empty";

export const SearchResults = () => {
  const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);
  const [tickets, setTickets] = useState(0);
  const [placeDetails, setPlaceDetails] = useState({});

  const { results } = useContext(SearchContext);

  const checkAvailability = async (planId, placeId) => {
    setOpenAvailabilityModal(true);
    const getAvailability = async () => {
      const response = await fetch(
        `https://tema-diplomes-travel-app-api.vercel.app/availability/${planId}/${placeId}`
      );
      return response.json();
    };
    const availability = await getAvailability();
    setTickets(availability.ticketsLeft);
  };

  return (
    <>
      <MainHeader />
      <div className="container">
        {results.searchedResult && (
          <div className="wishlist-item-wrapper">
            <h2>
              {!results.otherResults &&
                results.searchedResult.city.toUpperCase()}
            </h2>
            {results.searchedResult.thingstodo.map((place) => {
              return (
                <div className="wishlist-item margin-bottom-20">
                  <h1>{place.place}</h1>
                  <div className="flex gap-20">
                    <div>
                      <img
                        src={require(`../../../Backend/uploads/${place.image}`)}
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
                      onClick={() => {
                        checkAvailability(results.searchedResult._id, place.id);
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
        )}
        {results.otherResults && (
          <div>
            <div className="wishlist-item-wrapper">
              <h2>Vende të ngjashme</h2>

              <h2>{results.otherResults.city.toUpperCase()}</h2>
              {results.otherResults.thingstodo.map((place) => {
                return (
                  <div className="wishlist-item margin-bottom-20">
                    <h1>{place.place}</h1>
                    <div className="flex gap-20">
                      <div>
                        <img
                          src={require(`../../../Backend/uploads/${place.image}`)}
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
                        onClick={() => {
                          checkAvailability(
                            results.otherResults.cityId,
                            place.id
                          );
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
          </div>
        )}
        {!results.searchedResult && <Empty />}
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

export default SearchResults;
