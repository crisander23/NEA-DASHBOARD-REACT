import React from 'react';
import { Bar } from 'react-chartjs-2';

const TechnicalBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.province),
    datasets: [
      {
        label: 'Technical Performance',
        data: data.map(item => item.technicalPerformance), // Change this to technicalPerformance
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // You can choose any color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to control height
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '250px' }}> {/* Adjust height to 250px */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TechnicalBarChart;
