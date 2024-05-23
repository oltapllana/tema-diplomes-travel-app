import React, { useContext } from "react";
import { SearchContext } from "../SearchContext";
import MainHeader from "./MainHeader";

export const SearchResults = () => {
  const { results } = useContext(SearchContext);
  console.log("results", results);

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
                        // checkAvailability(plan.cityId, place.id);
                        // setPlaceTicket(place.place);
                        // setPlaceId(place.id);
                        // setPlaceDetails(place);
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
        )}
        {results.otherResults && (
          <div>
            <div className="wishlist-item-wrapper">
              <h2>Similar places</h2>

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
                          // checkAvailability(plan.cityId, place.id);
                          // setPlaceTicket(place.place);
                          // setPlaceId(place.id);
                          // setPlaceDetails(place);
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
          </div>
        )}
        {/* {!isLoading && travelPlans.length === 0 && <Empty />} */}
      </div>
      {/* {openAvailabilityModal && (
        <BookTicket
          openAvailabilityModal={openAvailabilityModal}
          setOpenAvailabilityModal={setOpenAvailabilityModal}
          item={placeDetails}
          tickets={tickets}
        />
      )} */}
    </>
  );
};

export default SearchResults;
