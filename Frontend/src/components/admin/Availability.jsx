import React, { useState } from "react";
import CustomDateRange from "../CustomDateRange";
import Modal from "./../Modal";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Availability = ({
  thingToDo,
  setAvailability,
  availability,
  placeId,
}) => {
  const [ticketsLeft, setTicketsLeft] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${API_BASE_URL}/set-availability/${placeId}/${thingToDo.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketsLeft,
        }),
      }
    );
    setAvailability(false);
  };

  return (
    <Modal
      isDisplay={availability}
      setIsDisplay={setAvailability}
      title={`Numri i biletave për ${thingToDo.place}`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex column-direction availability-form"
      >
        <label htmlFor="ticketsLeft">Numri i biletave në dispozicion: </label>
        <input
          type="number"
          id="ticketsLeft"
          value={ticketsLeft}
          onChange={(e) => setTicketsLeft(parseInt(e.target.value))}
        />
        <button className="availability-btn" type="submit">
          Cakto numrin e biletave
        </button>
      </form>
    </Modal>
  );
};

export default Availability;
