import React, { useState } from "react";
import Plus from "../../assets/admin/Plus";
import Minus from "../../assets/admin/Minus";
import Modal from "../Modal";

const AddPlacesDetails = ({
  place,
  setIsAddPlacesDetailsOpen,
  isModal = false,
}) => {
  const [thingsToDo, setThingsToDo] = useState([
    { text: "", place: "", image: null, price: "", lat: "", lng: "" },
  ]);
  const [thingsToDoCounter, setThingsToDoCounter] = useState(1);

  const addTextAndImages = async (e, placesId, textAndImagesData) => {
    e.preventDefault();
    const formData = new FormData();
    textAndImagesData.forEach(
      ({ text, place, image, price, lat, lng }, index) => {
        formData.append("texts", text);
        formData.append("places", place);
        formData.append("images", image);
        formData.append("prices", price);
        formData.append("latitudes", lat);
        formData.append("longitudes", lng);
      }
    );

    const response = await fetch(
      `https://tema-diplomes-travel-app.onrender.com/places/${placesId}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add text and images");
    }
  };

  const handleAddThingToDoText = (index, event) => {
    const newInputs = [...thingsToDo];
    newInputs[index] = { ...newInputs[index], text: event.target.value };
    setThingsToDo(newInputs);
  };

  const handleAddThingToDoImage = (index, event) => {
    const newInputs = [...thingsToDo];
    newInputs[index] = { ...newInputs[index], image: event.target.files[0] };
    setThingsToDo(newInputs);
  };

  const handleAddThingToDoPlace = (index, event) => {
    const newInputs = [...thingsToDo];
    newInputs[index] = { ...newInputs[index], place: event.target.value };
    setThingsToDo(newInputs);
  };

  const handleAddThingToDoPrice = (index, event) => {
    const newInputs = [...thingsToDo];
    newInputs[index] = { ...newInputs[index], price: event.target.value };
    setThingsToDo(newInputs);
  };

  const handleAddThingToDoLat = (index, event) => {
    const newInputs = [...thingsToDo];
    newInputs[index] = { ...newInputs[index], lat: event.target.value };
    setThingsToDo(newInputs);
  };

  const handleAddThingToDoLng = (index, event) => {
    const newInputs = [...thingsToDo];
    newInputs[index] = { ...newInputs[index], lng: event.target.value };
    setThingsToDo(newInputs);
  };

  return (
    <>
      <div className="place-details add-place-wrapper">
        <form className="add-place-form">
          {Array.from({ length: thingsToDoCounter }).map((_, index) => (
            <div className="flex space-between gap-10" key={index}>
              <input
                type="text"
                name="thingsToDo"
                value={thingsToDo[index]?.text}
                onChange={(event) => handleAddThingToDoText(index, event)}
                placeholder="Shto një gjë për të bërë"
              />
              <input
                type="text"
                name="place"
                value={thingsToDo[index]?.place}
                onChange={(event) => handleAddThingToDoPlace(index, event)}
                placeholder="Shto një vend"
              />
              <input
                type="file"
                onChange={(event) => handleAddThingToDoImage(index, event)}
              />
              <input
                type="text"
                name="price"
                value={thingsToDo[index]?.price}
                onChange={(event) => handleAddThingToDoPrice(index, event)}
                placeholder="Shto cmimin"
              />
              <input
                type="text"
                name="lat"
                value={thingsToDo[index]?.lat}
                onChange={(event) => handleAddThingToDoLat(index, event)}
                placeholder="Latitude"
              />
              <input
                type="text"
                name="lng"
                value={thingsToDo[index]?.lng}
                onChange={(event) => handleAddThingToDoLng(index, event)}
                placeholder="Longitude"
              />
              <div className="flex align-center gap-10">
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setThingsToDoCounter((prevState) => prevState + 1)
                  }
                >
                  <Plus />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setThingsToDoCounter((prevState) => prevState - 1)
                  }
                >
                  <Minus />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={(event) => {
              addTextAndImages(event, place.placesId, thingsToDo);
              if (isModal) {
                setIsAddPlacesDetailsOpen(false);
              }
            }}
            className="btn blue-btn"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPlacesDetails;
