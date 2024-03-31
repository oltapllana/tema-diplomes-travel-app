import React, { useState } from "react";
import Modal from "../Modal";

const AddPlace = ({ setIsAddPlacesModalOpen }) => {
  const [formDatas, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    thingsToDo: "",
  });
  const [imageFile, setImageFile] = useState(null);

  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", formDatas);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formDatas, [name]: value });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImageFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  };

  console.log(imageFile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object to send as multipart/form-data
    const formData = new FormData();
    formData.append("title", formDatas.title);
    formData.append("description", formDatas.description);
    formData.append("city", formDatas.city);
    formData.append("thingsToDo", formDatas.thingsToDo);
    formData.append("image", imageFile);

    console.log(formData);

    try {
      const response = await fetch("http://localhost:3000/places", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log success message from backend
      } else {
        console.error("Failed to add place:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding place:", error.message);
    }
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
          <textarea
            name="thingsToDo"
            value={formDatas.thingsToDo}
            onChange={handleChange}
            placeholder="Things to do (separated by commas)"
          ></textarea>
          <button type="submit">Add Place</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPlace;
