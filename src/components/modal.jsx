// Modal.js
import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          width: 400, // Adjust the width as needed
          padding: "2%",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent modal closure when clicking inside the modal
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
