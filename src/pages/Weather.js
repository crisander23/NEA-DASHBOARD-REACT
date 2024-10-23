// src/pages/Weather.js
import React, { useState } from 'react';
import WeatherMap from '../components/WeatherMap';
import WeatherCard from '../components/WeatherCard';
import '../css/MainPage.css'; // Assuming you have some styles here

const Weather = () => {
  const [selectedWeather, setSelectedWeather] = useState(null);

  const handleMapButtonClick = (weatherData, province) => {
    setSelectedWeather({ ...weatherData, province });
  };

  return (
    <div className="weather-page">
      <h1>Weather Map</h1>
      <WeatherMap onMapButtonClick={handleMapButtonClick} />
      {selectedWeather && (
        <WeatherCard weather={selectedWeather} />
      )}
    </div>
  );
};

export default Weather;
