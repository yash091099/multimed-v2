// Loader.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" color="#ffffff" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
