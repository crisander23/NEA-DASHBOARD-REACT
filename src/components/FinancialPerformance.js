// src/components/FinancialPerformance.js
import React from 'react';
import './FinancialPerformance.css';
import GaugeChart from 'react-gauge-chart'; // Import the Gauge Chart component

const FinancialPerformance = ({ values }) => {
  return (
    <div className="financial-performance">
      {values.map((value, index) => (
        <div className="performance-card" key={index}>
          <div className="card-content">
            <h3 className="card-title">Financial Performance {index + 1}</h3>
            <GaugeChart
              id={`gauge-chart${index + 1}`}
              nrOfLevels={3}
              colors={['#FF4500', '#FFA500', '#008000']}
              arcWidth={0.3}
              percent={value}
              needleColor="#000000"
              needleBaseColor="#000000"
              hideText={true}
              style={{ width: '250px', height: '150px' }}
            />
            <p className="gauge-value">{(value * 100).toFixed(0)}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialPerformance;
