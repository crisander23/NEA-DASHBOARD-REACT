import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverallBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.province),
    datasets: [
      {
        label: 'Overall Performance',
        data: data.map(item => item.overallPerformance),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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

export default OverallBarChart;
