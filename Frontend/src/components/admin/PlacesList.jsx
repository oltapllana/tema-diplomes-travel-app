import React, { useEffect, useState } from "react";
import { getPlaces } from "../../api/places";
import AddPlace from "./AddPlaces";
import AddPlacesDetails from "./AddPlacesDetails";
import PlaceDetails from "./PlaceDetails";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [isAddPlacesModalOpen, setIsAddPlacesModalOpen] = useState(false);
  const [isAddPlacesDetailsOpen, setIsAddPlacesDetailsOpen] = useState(false);
  const [place, setPlace] = useState(null);
  const [showPlaceDetails, setShowPlaceDetails] = useState(false);

  const getText = (str, maxLength, place) => {
    if (str.length <= maxLength) {
      return str;
    }
    return (
      <>
        {str.slice(0, maxLength)}
        <span
          className="blue-color cursor-pointer"
          onClick={() => {
            setPlace(place);
            setShowPlaceDetails(true);
          }}
        >
          ...show more
        </span>
      </>
    );
  };

  useEffect(() => {
    const getPlacess = async () => {
      const response = await getPlaces();
      if (response.error) {
        return;
      }
      setPlaces(response);
    };
    getPlacess();
  }, []);

  return (
    <>
      {!showPlaceDetails && (
        <div className="user-dashboard">
          <div className="user-list-header">
            <h2>Places List</h2>
            <button onClick={() => setIsAddPlacesModalOpen(true)}>
              Add new place
            </button>
          </div>
          <div className="admin-table places-admin-list">
            {places.map((place) => {
              return (
                <div key={place.id} className="place-wrapper">
                  <img
                    src={require(`../../../../Backend/uploads/${place.image}`)}
                    alt={place.title}
                    onClick={() => {
                      setShowPlaceDetails(true);
                      setPlace(place);
                    }}
                  />
                  <div className="place-description">
                    <h2>{place.title}</h2>
                    <span>{getText(place.description, 100, place)}</span>
                  </div>
                  <div className="flex flex-end">
                    <button
                      className="book-btn"
                      onClick={() => {
                        setPlace(place);
                        setIsAddPlacesDetailsOpen(true);
                      }}
                    >
                      Add details for this place
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showPlaceDetails && (
        <PlaceDetails place={place} setShowPlaceDetails={setShowPlaceDetails} />
      )}
      {isAddPlacesModalOpen && (
        <AddPlace setIsAddPlacesModalOpen={setIsAddPlacesModalOpen} />
      )}
      {isAddPlacesDetailsOpen && (
        <AddPlacesDetails
          setIsAddPlacesDetailsOpen={setIsAddPlacesDetailsOpen}
          place={place}
        />
      )}
    </>
  );
};

export default PlacesList;
