// src/components/ArcGISMap.js
import React, { useEffect } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css'; // ArcGIS styling
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic'; // Import Graphic to add points
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'; // Layer to hold graphics

const ArcGISMap = ({ onMapButtonClick }) => {
  useEffect(() => {
    // Create a map with the dark gray vector basemap
    const map = new Map({
      basemap: 'dark-gray-vector', // Updated to dark gray vector basemap
    });

    // Create a view and center it at the Philippines
    const view = new MapView({
      container: 'viewDiv', // ID for the container to render the map
      map: map, // Reference to the map object
      center: [121.7740, 12.8797], // Centered at the Philippines (longitude, latitude)
      zoom: 6, // Adjust zoom level (6 is for a regional view)
    });

    // Create a graphics layer for the circle buttons
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Function to determine marker color based on average of performance values
    const getColorForPerformance = (performanceValues) => {
      const averagePerformance = performanceValues.reduce((a, b) => a + b, 0) / performanceValues.length;

      if (averagePerformance <= 0.33) {
        return 'red'; // Low performance
      } else if (averagePerformance <= 0.66) {
        return 'yellow'; // Medium performance
      } else {
        return 'green'; // High performance
      }
    };

    // Function to create a circle button (graphic) for a location
    const createCircleButton = (longitude, latitude, province, technicalValues, financialValues, performanceValues) => {
      const color = getColorForPerformance(performanceValues); // Get the color based on performance values

      const graphic = new Graphic({
        geometry: {
          type: "point",
          longitude: longitude,
          latitude: latitude,
        },
        symbol: {
          type: "simple-marker",
          color: color, // Set the color of the marker based on performance
          size: "20px",
          outline: {
            color: "white",
            width: 3,
          },
        },
        popupTemplate: {
          title: `{province}`,
          content: `<button id="${province}-button">Click to Update</button>`,
        },
      });

      // Add an event listener to handle button click in the popup
      view.on("click", (event) => {
        view.hitTest(event).then((response) => {
          if (response.results.length) {
            const result = response.results.filter((res) => res.graphic === graphic)[0];
            if (result) {
              onMapButtonClick(technicalValues, financialValues, performanceValues, province); // Update the values on button click
            }
          }
        });
      });

      return graphic;
    };

    // Add all provinces' locations with their latitude and longitude
    const locations = [
      { province: 'Abra', latitude: 17.5745, longitude: 120.6220 },
      { province: 'Agusan del Norte', latitude: 9.0357, longitude: 125.5263 },
      { province: 'Agusan del Sur', latitude: 8.1250, longitude: 125.9350 },
      { province: 'Aklan', latitude: 11.7167, longitude: 122.3500 },
      { province: 'Albay', latitude: 13.1600, longitude: 123.7500 },
      { province: 'Antique', latitude: 10.7500, longitude: 121.9500 },
      { province: 'Apayao', latitude: 18.0780, longitude: 121.1719 },
      { province: 'Aurora', latitude: 15.8281, longitude: 121.5153 },
      { province: 'Basilan', latitude: 6.5236, longitude: 122.0553 },
      { province: 'Bataan', latitude: 14.6650, longitude: 120.4319 },
      { province: 'Batanes', latitude: 20.4500, longitude: 121.9700 },
      { province: 'Batangas', latitude: 13.7819, longitude: 121.0219 },
      { province: 'Benguet', latitude: 16.4130, longitude: 120.5931 },
      { province: 'Biliran', latitude: 11.5500, longitude: 124.4000 },
      { province: 'Bohol', latitude: 9.8847, longitude: 124.1435 },
      { province: 'Bukidnon', latitude: 8.0604, longitude: 124.8140 },
      { province: 'Bulacan', latitude: 14.7928, longitude: 120.8790 },
      { province: 'Cagayan', latitude: 18.1056, longitude: 121.8595 },
      { province: 'Camarines Norte', latitude: 14.1882, longitude: 122.5981 },
      { province: 'Camarines Sur', latitude: 13.5985, longitude: 123.2495 },
      { province: 'Camiguin', latitude: 9.1733, longitude: 124.7256 },
      { province: 'Capiz', latitude: 11.5000, longitude: 122.7500 },
      { province: 'Catanduanes', latitude: 13.7565, longitude: 124.2252 },
      { province: 'Cavite', latitude: 14.2794, longitude: 120.8820 },
      { province: 'Cebu', latitude: 10.5000, longitude: 123.8000 },
      { province: 'Cotabato', latitude: 7.0667, longitude: 124.9000 },
      { province: 'Davao de Oro', latitude: 7.7753, longitude: 126.0986 },
      { province: 'Davao del Norte', latitude: 7.5700, longitude: 125.6240 },
      { province: 'Davao del Sur', latitude: 6.8500, longitude: 125.3500 },
      { province: 'Davao Occidental', latitude: 6.2500, longitude: 125.5000 },
      { province: 'Davao Oriental', latitude: 7.0000, longitude: 126.2333 },
      { province: 'Dinagat Islands', latitude: 10.0639, longitude: 125.6067 },
      { province: 'Eastern Samar', latitude: 11.5833, longitude: 125.5000 },
      { province: 'Guimaras', latitude: 10.5943, longitude: 122.6311 },
      { province: 'Ifugao', latitude: 16.7797, longitude: 121.0824 },
      { province: 'Ilocos Norte', latitude: 18.1986, longitude: 120.5931 },
      { province: 'Ilocos Sur', latitude: 17.5745, longitude: 120.3883 },
      { province: 'Iloilo', latitude: 10.5000, longitude: 122.7000 },
      { province: 'Isabela', latitude: 16.9408, longitude: 121.8881 },
      { province: 'Kalinga', latitude: 17.6360, longitude: 121.5570 },
      { province: 'La Union', latitude: 16.6150, longitude: 120.3122 },
      { province: 'Laguna', latitude: 14.1700, longitude: 121.5300 },
      { province: 'Lanao del Norte', latitude: 8.1250, longitude: 124.1250 },
      { province: 'Lanao del Sur', latitude: 7.9649, longitude: 124.2892 },
      { province: 'Leyte', latitude: 11.1569, longitude: 124.9095 },
      { province: 'Maguindanao del Norte', latitude: 7.0000, longitude: 124.5000 },
      { province: 'Maguindanao del Sur', latitude: 6.8833, longitude: 124.5167 },
      { province: 'Marinduque', latitude: 13.3945, longitude: 121.9207 },
      { province: 'Masbate', latitude: 12.3000, longitude: 123.6000 },
      { province: 'Metro Manila (NCR)', latitude: 14.6000, longitude: 120.9842 },
      { province: 'Misamis Occidental', latitude: 8.2881, longitude: 123.8416 },
      { province: 'Misamis Oriental', latitude: 8.4772, longitude: 124.6455 },
      { province: 'Mountain Province', latitude: 17.0788, longitude: 120.9029 },
      { province: 'Negros Occidental', latitude: 10.0000, longitude: 123.0000 },
      { province: 'Negros Oriental', latitude: 9.3667, longitude: 123.3000 },
      { province: 'Northern Samar', latitude: 12.5000, longitude: 124.5000 },
      { province: 'Nueva Ecija', latitude: 15.4950, longitude: 121.0000 },
      { province: 'Nueva Vizcaya', latitude: 16.4930, longitude: 121.1763 },
      { province: 'Occidental Mindoro', latitude: 12.8700, longitude: 121.0700 },
      { province: 'Oriental Mindoro', latitude: 13.0000, longitude: 121.5000 },
      { province: 'Palawan', latitude: 9.8432, longitude: 118.7384 },
      { province: 'Pampanga', latitude: 15.0794, longitude: 120.6199 },
      { province: 'Pangasinan', latitude: 15.9500, longitude: 120.3333 },
      { province: 'Quezon', latitude: 14.1667, longitude: 122.0000 },
      { province: 'Quirino', latitude: 16.5333, longitude: 121.5667 },
      { province: 'Rizal', latitude: 14.6059, longitude: 121.2376 },
      { province: 'Romblon', latitude: 12.5700, longitude: 122.2871 },
      { province: 'Samar', latitude: 11.8053, longitude: 125.0100 },
      { province: 'Sarangani', latitude: 5.9600, longitude: 125.3000 },
      { province: 'Siquijor', latitude: 9.2167, longitude: 123.5333 },
      { province: 'Sorsogon', latitude: 12.9747, longitude: 124.0187 },
      { province: 'South Cotabato', latitude: 6.2250, longitude: 124.4972 },
      { province: 'Southern Leyte', latitude: 10.2798, longitude: 125.1061 },
      { province: 'Sultan Kudarat', latitude: 6.5000, longitude: 124.3000 },
      { province: 'Sulu', latitude: 5.9540, longitude: 121.0167 },
      { province: 'Surigao del Norte', latitude: 9.8000, longitude: 125.5000 },
      { province: 'Surigao del Sur', latitude: 8.5000, longitude: 126.0000 },
      { province: 'Tarlac', latitude: 15.4833, longitude: 120.5833 },
      { province: 'Tawi-Tawi', latitude: 5.2103, longitude: 120.0460 },
      { province: 'Zambales', latitude: 15.3362, longitude: 120.1655 },
      { province: 'Zamboanga del Norte', latitude: 8.5000, longitude: 123.3333 },
      { province: 'Zamboanga del Sur', latitude: 7.8333, longitude: 123.5000 },
      { province: 'Zamboanga Sibugay', latitude: 7.6833, longitude: 122.5000 },
    ];

    // Generate random values for each province
    locations.forEach((location) => {
      const technicalValues = Array.from({ length: 4 }, () => Math.random());
      const financialValues = Array.from({ length: 5 }, () => Math.random());
      const performanceValues = Array.from({ length: 3 }, () => Math.random());

      const graphic = createCircleButton(
        location.longitude,
        location.latitude,
        location.province,
        technicalValues,
        financialValues,
        performanceValues
      );
      graphicsLayer.add(graphic);
    });

    // Clean up the map view when the component unmounts
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [onMapButtonClick]);

  return <div id="viewDiv" className="arcgis-map" style={{ height: '100%' }}></div>;
};

export default ArcGISMap;
