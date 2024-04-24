import React from 'react';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal-backdrop">
      <div className="confirmation-modal-content">
        <h2 className="confirmation-modal-heading">Confirm Logout</h2>
        <p className="confirmation-modal-message">Are you sure you want to log out?</p>
        <div className="confirmation-modal-actions">
          <button className="confirmation-modal-logout-btn mr-2" onClick={onConfirm}>Logout</button>
          <button className="confirmation-modal-cancel-btn" onClick={onCancel}>Cancel Logout</button>
        </div>
      </div>

      {/* Inline styles for demonstration. You may want to move these into a CSS file. */}
      <style jsx>{`
        .confirmation-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; // Ensure it's above other content
        }

        .confirmation-modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px; // Set a max-width for larger screens
          width: 90%; // Responsive width on smaller screens
        }

        .confirmation-modal-heading {
          margin-bottom: 16px;
          font-size: 24px; // Adjust font size as needed
          color: #333; // Dark text for readability
        }

        .confirmation-modal-message {
          margin-bottom: 24px;
          font-size: 16px; // Adjust font size as needed
          color: #555; // Slightly lighter text
        }

        .confirmation-modal-actions {
          display: flex;
          justify-content: space-around;
        }

        .confirmation-modal-logout-btn {
          background-color: red; // Red color
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .confirmation-modal-logout-btn:hover {
          background-color: #c62828; // Darker shade for hover state
        }

        .confirmation-modal-cancel-btn {
          background-color: #7487FF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .confirmation-modal-cancel-btn:hover {
          background-color: #1565c0; // Darker shade for hover state
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
