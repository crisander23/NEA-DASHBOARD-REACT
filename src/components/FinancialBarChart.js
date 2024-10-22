import React from 'react';
import { Bar } from 'react-chartjs-2';

const FinancialBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.province),
    datasets: [
      {
        label: 'Financial Performance',
        data: data.map(item => item.financialPerformance),
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Set a distinct color for financial performance
        borderColor: 'rgba(255, 159, 64, 1)',
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

export default FinancialBarChart;
