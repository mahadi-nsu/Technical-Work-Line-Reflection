import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div
      className="Modal"
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  );
};

const ModalPropsAreEqual = (prevModal, nextModal) => {
  return (
    prevModal.show === nextModal.show ||
    prevModal.children === nextModal.children
  );
};

export default React.memo(Modal, ModalPropsAreEqual);
