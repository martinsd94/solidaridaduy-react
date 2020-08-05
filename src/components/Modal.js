import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = (props) => {
  const { visible, title, _close } = props;

  if (visible) {
    return (
      <div className="modal-view">
        <div className="modal-wrapper">
          <button className="close" onClick={_close}>
            <FaTimes />
          </button>
          <h2>{title}</h2>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
