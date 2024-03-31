import React, { useEffect, useState } from "react";
import { getCountryData, getPlaces } from "../api/places";
import Modal from "./Modal";
import PlaceModal from "./PlaceModal";
import ReviewPlaces from "./ReviewPlaces";

const PopularPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [placeDetails, setPlaceDetails] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const authToken = localStorage.getItem("authToken");

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

  const handleSeeDetails = async (place) => {
    const response = await getCountryData(place);
    console.log(response);
    if (response.error) {
      return;
    }
    setPlaceDetails(response);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <h1>Places</h1>
      <div className="grid-3">
        {places.map((place) => (
          <div key={place.id} className="place-wrapper">
            <img src={place.image} alt="aaaaaaaa" />
            <div className="place-description">
              <h2>{place.title}</h2>
              <span>{place.description}</span>
              <button
                className="book-btn"
                onClick={() => handleSeeDetails(place.city)}
              >
                See Details
              </button>
              <ReviewPlaces placeId={place.id}/>
            </div>
          </div>
        ))}
      </div>
      {isDetailsModalOpen && placeDetails && (
        <PlaceModal
          placeDetails={placeDetails}
          isDetailsModalOpen={isDetailsModalOpen}
          setIsDetailsModalOpen={setIsDetailsModalOpen}
        />
      )}
    </>
  );
};

export default PopularPlaces;
