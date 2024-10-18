const mongoose = require('mongoose');

const weatherSummarySchema = new mongoose.Schema({
    city: { type: String, required: true },
    averageTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantWeather: String,
});

module.exports = mongoose.model('WeatherSummary', weatherSummarySchema);
