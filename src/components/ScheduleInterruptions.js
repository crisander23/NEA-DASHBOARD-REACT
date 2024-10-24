// src/components/ScheduleInterruptions.js
import React, { useState, useEffect } from 'react';
import '../css/ScheduleInterruptions.css'; // Custom styles for the display

const ScheduleInterruptions = () => {
  const [interruptions, setInterruptions] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchInterruptions = async () => {
      try {
        const response = await fetch('http://neapc04:3010/api/dashboard/retrieve-scheduled-interruptions/');
        const data = await response.json();
        const formattedData = formatScheduledInterruptions(data);
        setInterruptions(formattedData);
      } catch (error) {
        console.error('Error fetching interruptions:', error);
      }
    };

    fetchInterruptions();
  }, []);

  // Format the scheduled interruptions data
  const formatScheduledInterruptions = (data) => {
    return data.map(item => ({
      EC_CODE: item.EC_CODE,
      areas: item.areas,
      purpose: item.purpose,
      timeoff: item.timeoff,
      timerestored: item.timerestored,
      timestamp: item.RECORD_TIMESTAMP
    }));
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">SCHEDULE INTERRUPTIONS</h2> {/* Title outside the scrollable area */}
      <div className="table-wrapper">
    
          
        <div className="table-scrollable">
          <table className="schedule-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>EC Code</th>
              <th style={{ width: '15%' }}>Areas</th>
              <th style={{ width: '20%' }}>Purpose</th>
              <th style={{ width: '15%' }}>Time Off</th>
              <th style={{ width: '15%' }}>Time Restored</th>
              <th style={{ width: '20%' }}>Record Timestamp</th>
            </tr>
          </thead>
   
            <tbody>
              {interruptions.map((interruption, index) => (
                <tr key={index}>
                  <td style={{ width: '15%' }}>{interruption.EC_CODE}</td>
                  <td style={{ width: '15%' }}>{interruption.areas}</td>
                  <td style={{ width: '20%' }}>{interruption.purpose}</td>
                  <td style={{ width: '15%' }}>{interruption.timeoff}</td>
                  <td style={{ width: '15%' }}>{interruption.timerestored}</td>
                  <td style={{ width: '20%' }}>{interruption.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterruptions;
