import React from "react";

const Modal = (props) => {
  const modalRef = React.createRef();

  const handleOutsideClick = (event) => {
    const modalClass = `.${modalRef.current.classList[0]}`;
    if (!event.target.closest(modalClass)) {
      props.setIsDisplay(false);
    }
  };
  return (
    <div className="modal-overlay" onClick={(evt) => handleOutsideClick(evt)}>
      <div className={`modal ${props.className}`} ref={modalRef}>
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
