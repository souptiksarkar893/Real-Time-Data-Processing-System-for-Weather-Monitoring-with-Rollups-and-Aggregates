const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Route to get weather data for a specific city
router.get('/weather/city/:city', weatherController.getWeatherByCity);

// Route to get weather summaries for all predefined cities (optional)
router.get('/weather', weatherController.getWeatherForAllCities);

// Route to get chart data for a specific city
router.get('/weather/chart/:city', weatherController.getChartDataByCity); // Add this line

module.exports = router;
