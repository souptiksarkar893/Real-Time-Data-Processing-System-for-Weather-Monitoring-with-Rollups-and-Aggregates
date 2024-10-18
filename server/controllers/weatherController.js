const axios = require('axios');
const WeatherSummary = require('../models/weatherSummary');

const API_KEY = process.env.WEATHER_API_KEY;

// Fetch weather data for a specific city
const fetchWeatherData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Convert temperatures from Kelvin to Celsius
    const weather = {
      city,
      averageTemp: data.main.temp - 273.15, // Changed to averageTemp
      maxTemp: data.main.temp_max - 273.15,  // Get max temperature
      minTemp: data.main.temp_min - 273.15,  // Get min temperature
      dominantWeather: data.weather[0].main,
      dt: data.dt,
    };

    return weather;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    return null; // Return null if the city is not found
  }
};

// Get weather data for a specific city from the API
const getWeatherByCity = async (req, res) => {
  const { city } = req.params;
  const weatherData = await fetchWeatherData(city);
  
  if (weatherData) {
    await processWeatherData(weatherData); // Call this to save the data
    res.json(weatherData);
  } else {
    res.status(404).json({ message: 'City not found' });
  }
};

// Rollup and aggregate weather data for a city
const processWeatherData = async (weatherData) => {
  const { city, averageTemp, maxTemp, minTemp, dominantWeather } = weatherData;
  const weatherSummary = new WeatherSummary({
    city,
    date: new Date(),
    averageTemp,
    maxTemp,
    minTemp,
    dominantWeather,
  });

  await weatherSummary.save();
};

// API to fetch weather data for all cities
const getWeatherForAllCities = async (req, res) => {
  try {
    const weatherSummaries = await WeatherSummary.find().limit(6);
    res.json(weatherSummaries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data.' });
  }
};

// New function to fetch chart data for a specific city
const getChartDataByCity = async (req, res) => {
  const { city } = req.params;
  // Replace with your actual logic for getting chart data
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    const data = response.data.list;

    // Process the response to get the temperature data for the chart
    const chartData = data.map(item => ({
      date: new Date(item.dt * 1000).toLocaleDateString(), // Convert to date
      temperature: item.main.temp - 273.15 // Convert to Celsius
    }));

    res.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(404).json({ message: 'City not found' });
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherForAllCities,
  getChartDataByCity, // Export the new function
};
