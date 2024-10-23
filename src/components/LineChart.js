import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import '../css/LineChart.css'; // Import the CSS file

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // X-axis labels
        datasets: [
          {
            label: 'Technical',
            data: [65, 59, 80, 81, 56, 55, 40], // Data for technical
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
          {
            label: 'Financial',
            data: [45, 39, 60, 71, 46, 35, 20], // Data for financial
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
          {
            label: 'Overall',
            data: [85, 79, 90, 101, 76, 85, 60], // Data for overall
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 10, // Smaller font size for the legend
              },
            },
          },
          title: {
            display: true,
            text: 'Performance Metrics',
            font: {
              size: 12, // Smaller title font size
            },
            padding: {
              top: 5,
              bottom: 5,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 10, // Smaller font for y-axis labels
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 10, // Smaller font for x-axis labels
              },
            },
          },
        },
      },
    });

    return () => {
      lineChart.destroy();
    };
  }, []);

  return (
    <div className="line-chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
