// src/components/PerformanceIndicators.js
import React from 'react';
import '../css/PerformanceIndicators.css';
import GaugeChart from 'react-gauge-chart'; // Import the Gauge Chart component

const PerformanceIndicators = ({ values = [] }) => {
  // If values are not provided, the array will default to an empty array
  
  return (
    <div className="performance-indicators">
      {values.length > 0 ? (
        values.map((value, index) => (
          <div className="indicator-card" key={index}>
            <div className="card-content">
              <h3 className="card-title">Performance Indicator {index + 1}</h3>
              <GaugeChart
                id={`gauge-chart${index + 1}`}
                nrOfLevels={2}
                colors={['#FFA500', '#EAEAEA']}
                arcWidth={0.3}
                percent={value}  /* Dynamic value passed as prop */
                needleColor="#000000"
                needleBaseColor="#000000"
                hideText={true}
                style={{ width: '250px', height: '150px' }}  
              />
              <p className="gauge-value">{(value * 100).toFixed(0)}%</p> {/* Display percentage */}
            </div>
          </div>
        ))
      ) : (
        <p>No performance data available.</p>  /* Display this when no values are passed */
      )}
    </div>
  );
};

export default PerformanceIndicators;
