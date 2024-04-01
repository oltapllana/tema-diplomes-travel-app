import React, { useState } from "react";
import Modal from "../Modal";
import { addNewPlace } from "../../api/places";
import Plus from "../../assets/admin/Plus";
import Minus from "../../assets/admin/Minus";

const AddPlace = ({ setIsAddPlacesModalOpen }) => {
  const [formDatas, setFormData] = useState({
    title: "",
    description: "",
    city: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [thingsToDo, setThingsToDo] = useState([{ text: "", image: null }]);

  const [thingsToDoCounter, setThingsToDoCounter] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formDatas, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", formDatas.title);
    formData.append("description", formDatas.description);
    formData.append("city", formDatas.city);
    formData.append("thingsToDo", JSON.stringify(thingsToDo));
    formData.append("image", imageFile);

    const response = await addNewPlace(formData);
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
    <Modal isDisplay={true} setIsDisplay={setIsAddPlacesModalOpen}>
      <div className="add-place-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formDatas.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            value={formDatas.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input type="file" onChange={handleImageChange} />
          <input
            type="text"
            name="city"
            value={formDatas.city}
            onChange={handleChange}
            placeholder="City"
          />
          <div>
            <span>Things to do</span>
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

                <div className="flex">
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
          <button type="submit">Add Place</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPlace;
