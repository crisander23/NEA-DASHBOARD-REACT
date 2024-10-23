// src/components/WeatherCard.js
import React from 'react';
import '../css/WeatherCard.css'; // Assuming you have some styles here

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.province}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
