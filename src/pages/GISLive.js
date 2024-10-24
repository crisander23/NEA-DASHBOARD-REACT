// src/pages/GISLive.js
import React from 'react';
import PhilippinesECMap from '../components/PhilippinesECMap'; // Import the PhilippinesECMap component

const GISLive = () => {
  return (
    <div style={{ height: '100vh' }}>
      <PhilippinesECMap /> {/* Render the PhilippinesECMap with EC locations */}
    </div>
  );
};

export default GISLive;
