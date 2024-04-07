import React, { useEffect, useState } from "react";
import Plus from "../../assets/admin/Plus";
import Minus from "../../assets/admin/Minus";
import Modal from "../Modal";

const AddPlacesDetails = ({ place, setIsAddPlacesDetailsOpen }) => {
  const [thingsToDo, setThingsToDo] = useState([{ text: "", image: null }]);
  const [shouldSumbit, setShouldSumbit] = useState(false);
  const [thingsToDoCounter, setThingsToDoCounter] = useState(1);

  const addTextAndImages = async (placesId, textAndImagesData) => {
    try {
      const formData = new FormData();
      textAndImagesData.forEach(({ text, image }) => {
        formData.append("texts", text);
        formData.append("images", image);
      });

      const response = await fetch(`http://localhost:3000/places/${placesId}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to add text and images");
      }

      const data = await response.json();
      setIsAddPlacesDetailsOpen(false);
    } catch (error) {
      console.error("Error:", error);
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

  return (
    <Modal setIsDisplay={setIsAddPlacesDetailsOpen} title="Things to do">
      <div className="place-details">
        {Array.from({ length: thingsToDoCounter }).map((_, index) => (
          <div className="flex space-between gap-10">
            <input
              type="text"
              name="thingsToDo"
              value={thingsToDo[index]?.text}
              onChange={(event) => handleAddThingToDoText(index, event)}
              placeholder="Add a thing to do"
            />
            <input
              type="file"
              className="aa"
              onChange={(event) => handleAddThingToDoImage(index, event)}
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
      </div>
      <button
        onClick={() => addTextAndImages(place.placesId, thingsToDo)}
        className="book-btn"
      >
        Save
      </button>
    </Modal>
  );
};

export default AddPlacesDetails;
