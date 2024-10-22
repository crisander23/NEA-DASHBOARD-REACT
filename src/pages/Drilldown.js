// src/pages/Drilldown.js
import React, { useState } from 'react';
import DrilldownPerformanceIndicator from '../components/DrilldownPerformanceIndicator';
import TechnicalPerformance from '../components/TechnicalPerformance';
import FinancialPerformance from '../components/FinancialPerformance';
import ArcGISMap from '../components/ArcGISMap';
import SelectedEC from '../components/SelectedEC'; // Import SelectedEC component

const Drilldown = () => {
  // State for technical performance, financial performance, performance indicator values, and selected province
  const [technicalValues, setTechnicalValues] = useState([0.4, 0.6, 0.8, 0.5]);
  const [financialValues, setFinancialValues] = useState([0.6, 0.4, 0.8, 0.5, 0.9]);
  const [performanceValues, setPerformanceValues] = useState([0.5, 0.75, 0.3]);
  const [selectedProvince, setSelectedProvince] = useState('Choose EC on Map');

  // Function to handle updating values when a button in ArcGIS is clicked
  const handleMapButtonClick = (newTechnicalValues, newFinancialValues, newPerformanceValues, province) => {
    setTechnicalValues(newTechnicalValues);
    setFinancialValues(newFinancialValues);
    setPerformanceValues(newPerformanceValues);
    setSelectedProvince(province); // Update the selected province in SelectedEC
  };

  return (
    <div className="main-container">
      {/* Left side - ArcGIS Map */}
      <div className="left-side">
        <ArcGISMap onMapButtonClick={handleMapButtonClick} /> {/* Pass the handler to ArcGISMap */}
      </div>

      {/* Right side - Performance Indicators */}
      <div className="right-side">
       
        <div className="performance-container">
        <SelectedEC selectedProvince={selectedProvince} /> {/* Pass the selected province */}
          <DrilldownPerformanceIndicator values={performanceValues} />
          <TechnicalPerformance values={technicalValues} />
          <FinancialPerformance values={financialValues} />
        </div>
      </div>
    </div>
  );
};

export default Drilldown;
