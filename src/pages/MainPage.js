// src/pages/MainPage.js
import React, { useState } from 'react';
import PerformanceIndicators from '../components/PerformanceIndicators';
import TechnicalPerformance from '../components/TechnicalPerformance'; // Import the Technical Performance component
import FinancialPerformance from '../components/FinancialPerformance'; // Import the Financial Performance component
import ArcGISMap from '../components/ArcGISMap'; // Import the ArcGISMap component
import '../css/MainPage.css'; // Import CSS file

const MainPage = () => {
  // Define state for performance indicators, technical performance, and financial performance
  const [performanceValues, setPerformanceValues] = useState([0.5, 0.75, 0.3]);
  const [technicalValues, setTechnicalValues] = useState([0.4, 0.6, 0.8, 0.5]);
  const [financialValues, setFinancialValues] = useState([0.6, 0.4, 0.8, 0.5, 0.9]);

  // Function to handle updates triggered from the ArcGIS map
  const handleMapButtonClick = (newTechnicalValues, newFinancialValues, newPerformanceValues) => {
    setTechnicalValues(newTechnicalValues);
    setFinancialValues(newFinancialValues);
    setPerformanceValues(newPerformanceValues);
  };

  return (
    <div className="main-container">
      {/* Left side - ArcGIS Map */}
      <div className="left-side">
        <ArcGISMap onMapButtonClick={handleMapButtonClick} /> {/* Pass handler to update values */}
      </div>

      {/* Right side - Performance Indicators */}
      <div className="right-side">
        <div className="performance-container">
          <PerformanceIndicators values={performanceValues} /> {/* Pass dynamic values */}
          <TechnicalPerformance values={technicalValues} /> {/* Pass dynamic values */}
          <FinancialPerformance values={financialValues} /> {/* Pass dynamic values */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
