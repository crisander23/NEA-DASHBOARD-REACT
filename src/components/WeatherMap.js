// src/components/WeatherMap.js
import React, { useEffect } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import axios from 'axios';

const WeatherMap = () => {
  useEffect(() => {
    // Create a new map with a base layer
    const map = new Map({
      basemap: 'dark-gray-vector', // Set a base map
    });

    // Create a new view for the map
    const view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [121.774, 12.8797], // Centered at the Philippines
      zoom: 6,
    });

    // Create a graphics layer to hold the rain data
    const rainLayer = new GraphicsLayer();
    map.add(rainLayer);

    // Function to create a heatmap based on rain intensity
    const createHeatmap = (rainData) => {
      rainData.forEach((dataPoint) => {
        const longitude = 121.774; // Example longitude (can be more dynamic)
        const latitude = 12.8797;  // Example latitude (can be more dynamic)
        const rainIntensity = dataPoint.value;

        const color = getColorForRain(rainIntensity);

        const point = {
          type: "point",
          longitude: longitude,
          latitude: latitude,
        };

        const symbol = {
          type: "simple-marker",
          color: color,
          size: "12px",
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        };

        const graphic = new Graphic({
          geometry: point,
          symbol: symbol,
        });

        rainLayer.add(graphic);
      });
    };

    // Function to get color based on rain intensity
    const getColorForRain = (intensity) => {
      if (intensity < 2) return 'rgba(0, 255, 0, 0.6)'; // Light rain, green
      if (intensity < 5) return 'rgba(255, 255, 0, 0.6)'; // Moderate rain, yellow
      return 'rgba(255, 0, 0, 0.6)'; // Heavy rain, red
    };

    // Fetch rain data from Open Meteo API
    const fetchRainData = async () => {
      try {
        const response = await axios.get(
          'https://api.open-meteo.com/v1/forecast?latitude=12.8797&longitude=121.774&hourly=rain&timezone=Asia%2FSingapore'
        );
        const rainData = response.data.hourly.rain.map((value, index) => ({
          time: response.data.hourly.time[index],
          value,
        }));
        createHeatmap(rainData);
      } catch (error) {
        console.error('Error fetching rain data:', error);
      }
    };

    fetchRainData();

    return () => {
      if (view) {
        view.destroy(); // Cleanup map view when component is unmounted
      }
    };
  }, []);

  return <div id="viewDiv" style={{ height: '100vh', width: '100%' }}></div>;
};

export default WeatherMap;
