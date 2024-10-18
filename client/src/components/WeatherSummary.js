import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';

const WeatherSummary = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');
  const [searchedWeather, setSearchedWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!city) return;

    try {
      const response = await axios.get(`/api/weather/city/${city}`);
      setSearchedWeather(response.data);
      setCity('');
    } catch (error) {
      console.error('Error fetching weather data for city:', error);
      setSearchedWeather(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Weather Monitoring Summary</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>City</th>
            <th>Average Temperature (°C)</th>
            <th>Max Temperature (°C)</th>
            <th>Min Temperature (°C)</th>
            <th>Dominant Weather</th>
          </tr>
        </thead>
        <tbody>
          {searchedWeather ? (
            <tr>
              <td>{searchedWeather.city}</td>
              <td>{searchedWeather.averageTemp !== undefined ? searchedWeather.averageTemp.toFixed(2) : 'N/A'}</td>
              <td>{searchedWeather.maxTemp !== undefined ? searchedWeather.maxTemp.toFixed(2) : 'N/A'}</td>
              <td>{searchedWeather.minTemp !== undefined ? searchedWeather.minTemp.toFixed(2) : 'N/A'}</td>
              <td>{searchedWeather.dominantWeather}</td>
            </tr>
          ) : (
            weatherData.map((summary, index) => (
              <tr key={index}>
                <td>{summary.city}</td>
                <td>{summary.averageTemp !== undefined ? summary.averageTemp.toFixed(2) : 'N/A'}</td>
                <td>{summary.maxTemp !== undefined ? summary.maxTemp.toFixed(2) : 'N/A'}</td>
                <td>{summary.minTemp !== undefined ? summary.minTemp.toFixed(2) : 'N/A'}</td>
                <td>{summary.dominantWeather}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {searchedWeather && <Chart city={searchedWeather.city} />}
    </div>
  );
};

export default WeatherSummary;
