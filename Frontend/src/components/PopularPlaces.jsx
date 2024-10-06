import React, { useEffect, useState } from "react";
import { getCountryData, getPlaces } from "../api/places";
import Modal from "./Modal";
import ReviewPlaces from "./ReviewPlaces";
import PlaceDetails from "./admin/PlaceDetails";
import MainHeader from "./MainHeader";

const PopularPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [placeDetails, setPlaceDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
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
            setShowDetails(true);
            setPlaceDetails(place);
          }}
        >
          ...shiko më shumë
        </span>
      </>
    );
  };

  return (
    <>
      <MainHeader />
      <div className="container position-relative top-65">
        <h1>Vendet</h1>
        {!showDetails && (
          <div className="places-grid grid-3">
            {places.map((place) => (
              <div key={place.id} className="place-wrapper">
                <h1 className="margin-0">{place.city}</h1>
                <img
                  src={require(`../../../Backend/uploads/${place.image}`)}
                  alt="aaaaaaaa"
                  onClick={() => {
                    setShowDetails(true);
                    setPlaceDetails(place);
                  }}
                />
                <div className="place-description">
                  <h2>{place.title}</h2>
                  <span>{getText(place.description, 100, place)}</span>
                  <button
                    className="book-btn"
                    onClick={() => {
                      setShowDetails(true);
                      setPlaceDetails(place);
                    }}
                  >
                    Shih detajet
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showDetails && (
          <PlaceDetails
            place={placeDetails}
            setShowPlaceDetails={setShowDetails}
          />
        )}
      </div>
    </>
  );
};

export default PopularPlaces;
