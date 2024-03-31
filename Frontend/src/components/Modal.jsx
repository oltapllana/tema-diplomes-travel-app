import React from "react";

const Modal = (props) => {
  return (
    <div className="modal-overlay">
      <div className={`modal ${props.className}`}>
        <div className="modal-header">
          <p>{props.title}</p>
          <button
            className="close-button"
            onClick={() => props.setIsDisplay(false)}
          >
            X
          </button>
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
