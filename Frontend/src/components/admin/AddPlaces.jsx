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
    formData.append("image", imageFile);

    const response = await addNewPlace(formData);
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
          <button type="submit">Add Place</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPlace;
