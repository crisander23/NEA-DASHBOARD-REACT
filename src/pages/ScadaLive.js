// src/pages/ScadaLive.js
import React from 'react';
import ScheduleInterruptions from '../components/ScheduleInterruptions'; // Import the ScheduleInterruptions component
import OngoingPowerOutages from '../components/OngoingPowerOutages'; // Import the OngoingPowerOutages component
import RestoredPowerOutages from '../components/RestoredPowerOutages'; // Import the new component
import '../css/ScadaLive.css'; // Import the ScadaLive-specific CSS
const ScadaLive = () => {
  return (
    <div>
      {/* Render the ScheduleInterruptions component */}
      <ScheduleInterruptions />
      <br></br>
      {/* Render the OngoingPowerOutages component below ScheduleInterruptions */}
      <OngoingPowerOutages />
      <br></br>
 {/* Render the RestoredPowerOutages component */}
      <RestoredPowerOutages />
    </div>
  );
};

export default ScadaLive;
