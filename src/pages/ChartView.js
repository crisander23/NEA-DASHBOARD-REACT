import React from 'react';
import ArcGISMap from '../components/ArcGISMap'; // Import ArcGISMap component
import OverallBarChart from '../components/OverallBarChart'; // Import OverallBarChart component
import TechnicalBarChart from '../components/TechnicalBarChart'; // Import TechnicalBarChart component
import FinancialBarChart from '../components/FinancialBarChart'; // Import FinancialBarChart component
import ScheduleInterruptions from '../components/ScheduleInterruptions'; // Import ScheduleInterruptions
import OngoingPowerOutages from '../components/OngoingPowerOutages'; // Import OngoingPowerOutages
import RestoredPowerOutages from '../components/RestoredPowerOutages'; // Import RestoredPowerOutages
import '../css/ChartView.css'; // Import ChartView CSS for layout

const ChartView = () => {
  // Example data for the bar charts by year (2014-2024)
  const ecPerformanceDataPerYear = [
    { year: 2014, overallPerformance: 60, technicalPerformance: 55, financialPerformance: 50 },
    { year: 2015, overallPerformance: 65, technicalPerformance: 60, financialPerformance: 55 },
    { year: 2016, overallPerformance: 70, technicalPerformance: 65, financialPerformance: 60 },
    { year: 2017, overallPerformance: 75, technicalPerformance: 68, financialPerformance: 65 },
    { year: 2018, overallPerformance: 78, technicalPerformance: 70, financialPerformance: 68 },
    { year: 2019, overallPerformance: 80, technicalPerformance: 72, financialPerformance: 70 },
    { year: 2020, overallPerformance: 82, technicalPerformance: 74, financialPerformance: 72 },
    { year: 2021, overallPerformance: 85, technicalPerformance: 77, financialPerformance: 75 },
    { year: 2022, overallPerformance: 88, technicalPerformance: 80, financialPerformance: 78 },
    { year: 2023, overallPerformance: 90, technicalPerformance: 82, financialPerformance: 80 },
    { year: 2024, overallPerformance: 92, technicalPerformance: 85, financialPerformance: 82 },
  ];

  const handleMapButtonClick = (newTechnicalValues, newFinancialValues, newPerformanceValues) => {
    // Logic for handling map interactions (update chart values if needed)
  };

  return (
    <div className="main-container">
      {/* Left side - ArcGIS Map */}
      <div className="left-side">
        <ArcGISMap onMapButtonClick={handleMapButtonClick} />
      </div>

      {/* Middle - Performance Charts */}
      <div className="middle-section">
        <div className="performance-container">
          <OverallBarChart data={ecPerformanceDataPerYear} />
          <TechnicalBarChart data={ecPerformanceDataPerYear} />
          <FinancialBarChart data={ecPerformanceDataPerYear} />
        </div>
      </div>

      {/* Right side - Schedule Interruptions and Power Outages */}
      <div className="right-side">
        <ScheduleInterruptions />
        <OngoingPowerOutages />
        <RestoredPowerOutages />
      </div>
    </div>
  );
};

export default ChartView;
