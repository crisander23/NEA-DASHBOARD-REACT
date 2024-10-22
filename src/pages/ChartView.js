import React from 'react';
import ArcGISMap from '../components/ArcGISMap'; // Import ArcGISMap component
import OverallBarChart from '../components/OverallBarChart'; // Import OverallBarChart component
import TechnicalBarChart from '../components/TechnicalBarChart'; // Import TechnicalBarChart component
import FinancialBarChart from '../components/FinancialBarChart'; // Import FinancialBarChart component
import '../css/ChartView.css'; // Import ChartView CSS for layout

const ChartView = () => {
  // Example data for the bar charts
  const ecPerformanceData = [
    { province: 'Cebu', overallPerformance: 75, technicalPerformance: 65, financialPerformance: 60 },
    { province: 'Misamis Oriental', overallPerformance: 85, technicalPerformance: 70, financialPerformance: 80 },
    { province: 'Ifugao', overallPerformance: 60, technicalPerformance: 55, financialPerformance: 50 },
    { province: 'Abra', overallPerformance: 90, technicalPerformance: 80, financialPerformance: 85 },
  ];

  const handleMapButtonClick = (newTechnicalValues, newFinancialValues, newPerformanceValues) => {
    // Logic for handling map interactions (update chart values if needed)
  };

  return (
    <div className="main-container">
      {/* Left side - ArcGIS Map */}
      <div className="left-side">
        <ArcGISMap onMapButtonClick={handleMapButtonClick} /> {/* Pass handler to update values */}
      </div>

      {/* Right side - Overall Bar Chart, Technical Bar Chart, and Financial Bar Chart */}
      <div className="right-side">
        <div className="performance-container">
          <OverallBarChart data={ecPerformanceData} /> {/* Pass EC overall performance data */}
          <TechnicalBarChart data={ecPerformanceData} /> {/* Technical Performance Bar Chart */}
          <FinancialBarChart data={ecPerformanceData} /> {/* Financial Performance Bar Chart */}
        </div>
      </div>
    </div>
  );
};

export default ChartView;
