// src/components/DrilldownPerformanceIndicator.js
import React from 'react';
import './DrilldownPerformanceIndicator.css';

const DrilldownPerformanceIndicator = ({ values = [] }) => {
  // Labels for the cards
  const labels = ['FINANCIAL', 'TECHNICAL', 'OVERALL'];

  // Function to determine the background color based on the value
  const getBackgroundColor = (value) => {
    if (value === null || value === undefined) {
      return 'grey'; // If not selected, grey background
    } else if (value > 0.5) {
      return 'green'; // Met
    } else {
      return 'red'; // Not Met
    }
  };

  // Function to determine the text based on the value
  const getText = (value) => {
    if (value === null || value === undefined) {
      return 'Please select EC'; // Default message when no value is selected
    } else if (value > 0.5) {
      return 'Met';
    } else {
      return 'Not Met';
    }
  };

  // Default empty values with grey background if no values are provided
  const defaultValues = [null, null, null]; // Three cards will show grey if unselected

  return (
    <div className="drilldown-performance-indicators">
      {(values.length > 0 ? values : defaultValues).map((value, index) => (
        <div
          className="indicator-card-drilldown"
          key={index}
          style={{ backgroundColor: getBackgroundColor(value) }} // Set the background color based on the value
        >
          <div className="card-content-drilldown">
            <h3 className="card-title-drilldown">{labels[index]}</h3> {/* Display card label */}
            <p className="performance-status">{getText(value)}</p> {/* Display "Met", "Not Met", or "Please select EC" */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrilldownPerformanceIndicator;
