import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,    // Make sure LinearScale is imported
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,      // Register LinearScale to resolve the error
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverallBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.year), // Mapping 'year' instead of 'province'
    datasets: [
      {
        label: 'Overall Performance',
        data: data.map(item => item.overallPerformance),
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.9)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0.3)');
          return gradient;
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderRadius: 10, 
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)' 
        }
      },
      x: {
        grid: {
          display: false 
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'EC OVERALL PERFORMANCE', // Title of the chart
        font: {
          size: 18
        },
        color: '#fff', // Title color
        padding: {
          top: 10,
          bottom: 10
        }
      },
      tooltip: {
        backgroundColor: '#333',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        titleFont: { size: 16 }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default OverallBarChart;
