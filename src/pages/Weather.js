import React from 'react';
import '../css/Weather.css'; // Add any necessary styling here

const Weather = () => {
  return (
    <div className="weather-container">
      {/* First iframe: Weather map */}
      <iframe
        src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=15.48&lon=120.6"
        title="Weather Map"
        width="100%"
        height="100%"
        style={{ border: 'none', position: 'absolute', top: 0, left: 0 }}
        allowFullScreen
      ></iframe>

      {/* Second iframe: Forecast overlay (moved to the top) */}
      <iframe
        src="https://embed.windy.com/embed.html?type=forecast&location=coordinates&detail=true&detailLat=14.6509905&detailLon=121.0486155&metricTemp=default&metricRain=default&metricWind=default"
        title="Weather Forecast"
        width="650"
        height="187"
        style={{
          border: 'none',
          position: 'absolute',
          top: '100PX',   // Moved to the top
          left: '20px',  // You can adjust these values for the overlay position
          zIndex: 1,     // Ensure it's on top of the map
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add background for visibility
          borderRadius: '10px' // Optional: Add some rounded corners
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Weather;
