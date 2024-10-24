import React from 'react';
import { Bar } from 'react-chartjs-2';

const TechnicalBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.year),
    datasets: [
      {
        label: 'Technical Performance',
        data: data.map(item => item.technicalPerformance),
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(54, 162, 235, 0.9)');
          gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)');
          return gradient;
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderRadius: 10, 
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)', 
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
        text: 'EC TECHNICAL PERFORMANCE', // Title of the chart
        font: {
          size: 18
        },
        color: '#fff',
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

export default TechnicalBarChart;
