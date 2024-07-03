import React, { useState } from "react";
import Modal from "../Modal";
import { addNewPlace } from "../../api/places";
import Plus from "../../assets/admin/Plus";
import Minus from "../../assets/admin/Minus";
import MainHeader from "./../MainHeader";

const AddPlaces = ({ place, setPlace, setShowAddPlacesDetails }) => {
  const [formDatas, setFormData] = useState({
    title: "",
    description: "",
    city: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

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
    setError(null);
    if (
      formDatas.title === "" ||
      formDatas.description === "" ||
      formDatas.city === "" ||
      imageFile === null
    ) {
      setError("All inputs are required");
      return;
    }
    const response = await fetch("https://tema-diplomes-travel-app-api.vercel.app/places", {
      method: "POST",
      body: formData,
    });

    const placeId = await response.json();
    setPlace(placeId);
    setShowAddPlacesDetails(true);
  };

  return (
    <>
      <MainHeader />
      <div className="add-place-wrapper">
        <div className="user-list-header">
          <h2>Shto të dhëna për vendin e ri</h2>
        </div>
        <form className="add-place-form" onSubmit={handleSubmit}>
          <div className="grid2 gap-20">
            <div className="flex column-direction">
              <label htmlFor="title">Titulli</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formDatas.title}
                onChange={handleChange}
                placeholder="Shkruaj titullin..."
              />
              <label htmlFor="description">Përshkrimi</label>
              <textarea
                id="description"
                name="description"
                value={formDatas.description}
                onChange={handleChange}
                placeholder="Shkruaj përshkrimin..."
              ></textarea>
            </div>
            <div className="flex column-direction">
              <label htmlFor="image">Shto fotografi</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
              />

              <label htmlFor="city">Qyteti</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formDatas.city}
                onChange={handleChange}
                placeholder="Shkruaj qytetin..."
              />
            </div>
          </div>
          {error && <span className="red-error">{error}</span>}
          <button className="btn blue-btn" type="submit">
            Shto vendin
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPlaces;
