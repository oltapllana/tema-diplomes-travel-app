import React, { useState } from "react";
import CustomDateRange from "../CustomDateRange";
import Modal from "./../Modal";

const Availability = ({ thingToDo, setAvailability, availability }) => {
  const [ticketsLeft, setTicketsLeft] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/set-availability/${thingToDo.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketsLeft,
        }),
      });
    } catch (error) {
      console.error("Error setting availability and tickets left:", error);
    }
  };

  return (
    <Modal
      isDisplay={availability}
      setIsDisplay={setAvailability}
      title={`Number of tickets for ${thingToDo.place}`}
    >
      <form onSubmit={handleSubmit} className="flex column-direction availability-form">
        <label htmlFor="ticketsLeft">Number of available tickets:</label>
        <input
          type="number"
          id="ticketsLeft"
          value={ticketsLeft}
          onChange={(e) => setTicketsLeft(e.target.value)}
        />
        <button className="availability-btn" type="submit">
          Set Availability
        </button>
      </form>
    </Modal>
  );
};

export default Availability;
