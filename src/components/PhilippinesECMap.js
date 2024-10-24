import React, { useEffect, useState } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import axios from 'axios';

const PhilippinesECMap = () => {
  const [ecData, setEcData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/ec-coordinates')
      .then(response => {
        console.log('API response:', response.data);
        setEcData(response.data);
      })
      .catch(error => {
        console.error('Error fetching province coordinates:', error);
      });
  }, []);

  useEffect(() => {
    if (ecData.length === 0) {
      console.log('No data to display markers');
      return;
    }

    const map = new Map({
      basemap: 'dark-gray-vector',
    });

    const view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [121.774, 12.8797], // Philippines center
      zoom: 5, // Zoom out for better visibility
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const createCircleMarker = (longitude, latitude, province) => {
      console.log(`Creating marker for ${province} at coordinates: [${latitude}, ${longitude}]`);
      const graphic = new Graphic({
        geometry: {
          type: 'point',
          longitude: longitude,
          latitude: latitude,
        },
        symbol: {
          type: 'simple-marker',
          color: 'red',
          size: '24px', // Increase marker size
          outline: {
            color: 'white',
            width: 2,
          },
        },
        popupTemplate: {
          title: `{province}`,
          content: `<strong>Province:</strong> ${province}`,
        },
      });
      return graphic;
    };

    ecData.forEach(ec => {
      const { latitude, longitude, province } = ec;
      if (longitude && latitude) {
        const marker = createCircleMarker(longitude, latitude, province);
        graphicsLayer.add(marker);
      } else {
        console.log(`Invalid coordinates for ${province}`);
      }
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [ecData]);

  return <div id="viewDiv" className="arcgis-map" style={{ height: '100%', width: '100%' }}></div>;
};

export default PhilippinesECMap;
