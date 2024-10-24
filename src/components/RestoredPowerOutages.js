// src/components/OngoingPowerOutages.js
import React, { useState, useEffect } from 'react';
import '../css/RestoredPowerOutages.css'; // Import the new CSS specific to OngoingPowerOutages


const RestoredPowerOutages = () => {
  const [outages, setOutages] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchOngoingOutages = async () => {
      try {
        const response = await fetch('http://neapc04:3010/api/dashboard/retrieve-restored-power-outages/');
        const data = await response.json();
        const formattedData = formatOngoingOutages(data);
        setOutages(formattedData);
      } catch (error) {
        console.error('Error fetching outages:', error);
      }
    };

    fetchOngoingOutages();
  }, []);

  // Format the ongoing power outages data
  const formatOngoingOutages = (data) => {
    return data.map(item => ({
      EC_CODE: item.EC_CODE,
      areas: item.areas,
      timeoff: item.timerestored,

      feeder: item.feeder,
      timestamp: item.RECORD_TIMESTAMP
    }));
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">ONGOING POWER OUTAGES</h2> {/* Title outside the scrollable area */}
      <div className="table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>EC Code</th>
              <th style={{ width: '20%' }}>Areas</th>
              <th style={{ width: '15%' }}>Time Rest0red</th>
          
              <th style={{ width: '15%' }}>Feeder</th>
              <th style={{ width: '15%' }}>Record Timestamp</th>
            </tr>
          </thead>
        </table>
        <div className="table-scrollable">
          <table className="schedule-table">
            <tbody>
              {outages.map((outage, index) => (
                <tr key={index}>
                  <td style={{ width: '15%' }}>{outage.EC_CODE}</td>
                  <td style={{ width: '20%' }}>{outage.areas}</td>
                  <td style={{ width: '15%' }}>{outage.timerestored}</td>
              
                  <td style={{ width: '15%' }}>{outage.feeder}</td>
                  <td style={{ width: '15%' }}>{outage.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestoredPowerOutages;
