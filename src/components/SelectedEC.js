// src/components/SelectedEC.js
import React from 'react';
import './SelectedEC.css';

const SelectedEC = ({ selectedProvince }) => {
  return (
    <div className="selected-ec-card">
      <h2>{selectedProvince}</h2> {/* Display the selected province name */}
    </div>
  );
};

export default SelectedEC;
