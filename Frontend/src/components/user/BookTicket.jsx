import React, { useState } from "react";
import Modal from "./../Modal";
import CustomDateRange from "./../CustomDateRange";

const BookTicket = (props) => {
  console.log("props", props);
  const [numTickets, setNumTickets] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/user/${localStorage.getItem("id")}/book/${
        props.item?.id
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("id"),
          numTickets,
          selectedDate,
          selectedHour,
          bookedPlace: props.item,
        }),
      }
    );

    if (response.ok) {
      props.setOpenAvailabilityModal(false);
    }
  };

  const handleIncrement = () => setNumTickets((prevState) => prevState + 1);
  const handleDecrement = () => setNumTickets((prevState) => prevState - 1);

  return (
    <Modal
      isDisplay={props.openAvailabilityModal}
      setIsDisplay={props.setOpenAvailabilityModal}
      title={`Available ticket for: ${props.item?.place}`}
    >
      <form className="book-ticket-form" onSubmit={handleBooking}>
        <span>Tickets left: {props.tickets}</span>
        <div className="ticket-counter">
          <button
            className="ticket-number"
            type="button"
            onClick={handleDecrement}
          >
            -
          </button>
          <input type="text" value={numTickets} readOnly />
          <button
            className="ticket-number"
            type="button"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={today}
          />
        </label>

        <label>
          Select Hour:
          <select
            value={selectedHour}
            onChange={(event) => setSelectedHour(event.target.value)}
          >
            <option value="">Select Hour</option>
            {[...Array(13).keys()].map((hour) => (
              <option key={hour} value={`${hour + 8}:00`}>{`${
                hour + 8
              }:00`}</option>
            ))}
          </select>
          {error && <span>{error}</span>}
        </label>
        <button type="submit">Book Tickets</button>
      </form>
    </Modal>
  );
};

export default BookTicket;
