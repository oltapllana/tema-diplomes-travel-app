import React, { useEffect, useState } from "react";
import { getPlaces } from "../../api/places";
import AddPlace from "./AddPlaces";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [isAddPlacesModalOpen, setIsAddPlacesModalOpen] = useState(false);
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
  console.log(places);

  return (
    <>
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
                <img src={place.image} alt="aaaaaaaa" />
                <div className="place-description">
                  <h2>{place.title}</h2>
                  <span>{place.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isAddPlacesModalOpen && (
        <AddPlace setIsAddPlacesModalOpen={setIsAddPlacesModalOpen} />
      )}
    </>
  );
};

export default PlacesList;
