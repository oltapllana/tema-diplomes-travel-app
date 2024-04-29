import React from "react";
import Modal from "./Modal";

const PlaceModal = (props) => {
  return (
    <Modal
      isDisplay={props.isDetailsModalOpen}
      setIsDisplay={props.setIsDetailsModalOpen}
      title="Details"
    >
      <h1>{props.placeDetails.country}</h1>
      {props.placeDetails.thingsToDo.map(place => {
        return <p>{place}</p>
      })}
    </Modal>
  );
};

export default PlaceModal;
