import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart components and the datalabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const GraphComponent = ({ title, score }) => {
  // Data for the Doughnut chart
  const data = {
    labels: [title],
    datasets: [
      {
        data: [score, 100 - score], // Full circle (score + remaining part)
        backgroundColor: ['#2b6cb0', '#E0E0E0'], // Color of the score and the empty space
        borderWidth: 0, // Remove border
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
      datalabels: {
        display: true,
        color: '#333', // Color of the score text
        font: {
          size: 30, // Font size of the number
          weight: 'bold', // Make the number bold
        },
        formatter: (value) => `${value}%`, // Display score inside the circle
        align: 'center', // Center the text inside the doughnut
        anchor: 'center', // Ensure text is anchored in the middle
      },
    },
    cutout: '70%', // This makes the center of the doughnut large enough for the text
  };

  return (
    <div className="max-w-xs mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GraphComponent;
