// src/components/Modal.js
import React from 'react';
import '../css/Modal.css'; // Add your CSS for modal styling

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{data.province} Data</h3>
        <p><strong>Technical Performance:</strong> {data.technicalValues.join(', ')}</p>
        <p><strong>Financial Performance:</strong> {data.financialValues.join(', ')}</p>
        <p><strong>Performance Values:</strong> {data.performanceValues.join(', ')}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
