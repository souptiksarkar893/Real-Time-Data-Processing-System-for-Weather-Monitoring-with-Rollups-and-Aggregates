import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(LineElement, LinearScale, PointElement, Tooltip, Legend, CategoryScale);

const Chart = ({ city }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  
  useEffect(() => {
    const fetchWeatherChartData = async () => {
      try {
        const response = await axios.get(`/api/weather/chart/${city}`);
        const data = response.data;

        // Prepare data for the chart
        const labels = data.map(item => item.date); // Assuming 'date' is a field in your response
        const temperatures = data.map(item => item.temperature); // Adjust based on your response structure

        setChartData({
          labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    if (city) {
      fetchWeatherChartData();
    }
  }, [city]);

  return (
    <div>
      <h3>Temperature Chart for {city}</h3>
      <Line data={chartData} />
    </div>
  );
};

export default Chart;
