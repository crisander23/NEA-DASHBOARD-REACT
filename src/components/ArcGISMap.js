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

    // Add locations from the provided table
    const locations = [
      { province: 'LUELCO', longitude: 120.3551838, latitude: 16.3818514 },
      { province: 'INEC', longitude: 120.676837, latitude: 18.13669308 },
      { province: 'ISECO', longitude: 120.4423406, latitude: 17.30330665 },
      { province: 'PANELCO I', longitude: 119.8661501, latitude: 16.21130812 },
      { province: 'CENPELCO', longitude: 120.3483358, latitude: 15.91776658 },
      { province: 'PANELCO III', longitude: 120.5708189, latitude: 15.96991438 },
      { province: 'BATANELCO', longitude: 121.9673495, latitude: 20.44446185 },
      { province: 'CAGELCO I', longitude: 121.6785389, latitude: 17.61523206 },
      { province: 'CAGELCO II', longitude: 121.6463464, latitude: 18.34063526 },
      { province: 'ISELCO I', longitude: 121.6967411, latitude: 16.8070275 },
      { province: 'ISELCO II', longitude: 121.861763, latitude: 17.10332858 },
      { province: 'NUVELCO', longitude: 121.0655668, latitude: 16.32565767 },
      { province: 'QUIRELCO', longitude: 121.5042055, latitude: 16.59121889 },
      { province: 'ABRECO', longitude: 120.6172034, latitude: 17.60740762 },
      { province: 'BENECO', longitude: 120.592782, latitude: 16.4428791 },
      { province: 'IFELCO', longitude: 121.1231847, latitude: 16.80161835 },
      { province: 'KAELCO', longitude: 121.4411099, latitude: 17.39783795 },
      { province: 'MOPRECO', longitude: 120.9801442, latitude: 17.09485922 },
      { province: 'AURELCO', longitude: 121.5423753, latitude: 15.81278459 },
      { province: 'TARELCO I', longitude: 120.6113308, latitude: 15.58294891 },
      { province: 'TARELCO II', longitude: 120.6495085, latitude: 15.32487251 },
      { province: 'NEECO I', longitude: 120.9198579, latitude: 15.30542402 },
      { province: 'NEECO II Area 1', longitude: 120.9209125, latitude: 15.59836769 },
      { province: 'NEECO II Area 2', longitude: 120.9386962, latitude: 15.35829417 },
      { province: 'SAJELCO', longitude: 120.9717148, latitude: 15.78426788 },
      { province: 'PRESCO', longitude: 120.6905996, latitude: 15.14719439 },
      { province: 'PELCO I', longitude: 120.7494239, latitude: 15.0740211 },
      { province: 'PELCO II', longitude: 120.6294155, latitude: 14.97241455 },
      { province: 'PELCO III', longitude: 120.7590695, latitude: 14.96165001 },
      { province: 'PENELCO', longitude: 120.5168284, latitude: 14.68832036 },
      { province: 'ZAMECO I', longitude: 119.9501754, latitude: 15.44812141 },
      { province: 'ZAMECO II', longitude: 120.1833453, latitude: 14.94748676 },
      { province: 'FLECO', longitude: 121.4663887, latitude: 14.30464274 },
      { province: 'BATELEC I', longitude: 120.8087174, latitude: 13.93068998 },
      { province: 'BATELEC II', longitude: 121.166239, latitude: 13.93383751 },
      { province: 'QUEZELCO I', longitude: 122.0988752, latitude: 13.81954364 },
      { province: 'QUEZELCO II', longitude: 121.6424088, latitude: 14.73739956 },
      { province: 'LUBELCO', longitude: 120.1657936, latitude: 13.82261969 },
      { province: 'OMECO', longitude: 121.0667274, latitude: 12.35195748 },
      { province: 'ORMECO', longitude: 121.1602062, latitude: 13.36928861 },
      { province: 'MARELCO', longitude: 121.8224147, latitude: 13.42285437 },
      { province: 'TIELCO', longitude: 121.9852387, latitude: 12.40412944 },
      { province: 'ROMELCO', longitude: 122.2748268, latitude: 12.57647776 },
      { province: 'BISELCO', longitude: 120.2015083, latitude: 12.01354474 },
      { province: 'PALECO', longitude: 118.7471862, latitude: 9.768354082 },
      { province: 'CANORECO', longitude: 122.9571285, latitude: 14.11270329 },
      { province: 'CASURECO I', longitude: 123.0364428, latitude: 13.69820069 },
      { province: 'CASURECO II', longitude: 123.232141, latitude: 13.61864451 },
      { province: 'CASURECO III', longitude: 123.4055194, latitude: 13.43979947 },
      { province: 'CASURECO IV', longitude: 123.4937702, latitude: 13.62513741 },
      { province: 'ALECO', longitude: 123.7325721, latitude: 13.14080329 },
      { province: 'SORECO I', longitude: 124.0019424, latitude: 12.7387772 },
      { province: 'SORECO II', longitude: 124.0473212, latitude: 12.97522867 },
      { province: 'FICELCO', longitude: 124.2667217, latitude: 13.59605275 },
      { province: 'MASELCO', longitude: 123.6445293, latitude: 12.34373669 },
      { province: 'TISELCO', longitude: 123.7367611, latitude: 12.5668386 },
      { province: 'AKELCO', longitude: 122.3263436, latitude: 11.67375448 },
      { province: 'ANTECO', longitude: 121.9381623, latitude: 10.75764846 },
      { province: 'CAPELCO', longitude: 122.7743462, latitude: 11.45767165 },
      { province: 'ILECO I', longitude: 122.385676, latitude: 10.67501655 },
      { province: 'ILECO II', longitude: 122.6457799, latitude: 10.95056708 },
      { province: 'ILECO III', longitude: 123.0137526, latitude: 11.25810697 },
      { province: 'GUIMELCO', longitude: 122.5829227, latitude: 10.58801627 },
      { province: 'VRESCO', longitude: 123.0686423, latitude: 10.90047624 },
      { province: 'CENECO', longitude: 122.9522169, latitude: 10.66633245 },
      { province: 'NOCECO', longitude: 122.8333363, latitude: 10.02794487 },
      { province: 'NORECO I', longitude: 123.1493619, latitude: 9.729696787 },
      { province: 'NORECO II', longitude: 123.3057702, latitude: 9.309592328 },
      { province: 'BANELCO', longitude: 123.7146851, latitude: 11.18326164 },
      { province: 'CEBECO I', longitude: 123.4526839, latitude: 10.07710548 },
      { province: 'CEBECO', longitude: 123.9927944, latitude: 11.01533471 },
      { province: 'CEBECO III', longitude: 123.6504309, latitude: 10.38331036 },
      { province: 'PROSIELCO', longitude: 123.5709391, latitude: 9.239358258 },
      { province: 'CELCO', longitude: 124.4018097, latitude: 10.64037179 },
      { province: 'BOHECO I', longitude: 123.9768181, latitude: 9.949431255 },
      { province: 'BOHECO II', longitude: 124.3574399, latitude: 9.63231658 },
      { province: 'DORELCO', longitude: 125.0384725, latitude: 11.00725099 },
      { province: 'LEYECO II', longitude: 125.0012558, latitude: 11.22930729 },
      { province: 'LEYECO III', longitude: 124.7464509, latitude: 11.25489594 },
      { province: 'LEYECO IV', longitude: 124.7441149, latitude: 10.38827166 },
      { province: 'LEYECO V', longitude: 124.6034654, latitude: 11.04089118 },
      { province: 'SOLECO', longitude: 124.8565737, latitude: 10.14223011 },
      { province: 'BILECO', longitude: 124.4139418, latitude: 11.55642738 },
      { province: 'NORSAMELCO', longitude: 124.5904396, latitude: 12.50958658 },
      { province: 'SAMELCO I', longitude: 124.6382805, latitude: 12.05113761 },
      { province: 'SAMELCO II', longitude: 125.0200646, latitude: 11.77554038 },
      { province: 'ESAMELCO', longitude: 125.4573801, latitude: 11.58864472 },
      { province: 'ZANECO', longitude: 123.341252, latitude: 8.585762684 },
      { province: 'ZAMSURECO I', longitude: 123.4393035, latitude: 7.827464278 },
      { province: 'ZAMSURECO II', longitude: 122.6102307, latitude: 7.798961833 },
      { province: 'ZAMELCO', longitude: 122.0932963, latitude: 6.93668687 },
      { province: 'MOELCI I', longitude: 123.8513939, latitude: 8.152507796 },
      { province: 'MOELCI II', longitude: 123.8511406, latitude: 8.152665402 },
      { province: 'MORESCO I', longitude: 124.439707, latitude: 8.572702902 },
      { province: 'MORESCO II', longitude: 125.0165261, latitude: 8.912997276 },
      { province: 'FIBECO', longitude: 125.0083222, latitude: 7.775726591 },
      { province: 'BUSECO', longitude: 124.8643558, latitude: 8.365742384 },
      { province: 'CAMELCO', longitude: 124.7242478, latitude: 9.243124686 },
      { province: 'LANECO', longitude: 123.7911661, latitude: 8.041658268 },
      { province: 'DORECO', longitude: 126.2036352, latitude: 6.958986233 },
      { province: 'DANECO', longitude: 125.9874985, latitude: 7.690844802 },
      { province: 'DASURECO', longitude: 125.3664307, latitude: 6.760318882 },
      { province: 'COTELCO', longitude: 124.9289443, latitude: 7.082053529 },
      { province: 'SOCOTECO I', longitude: 124.8249534, latitude: 6.51738071 },
      { province: 'SOCOTECO II', longitude: 125.1838894, latitude: 6.115860775 },
      { province: 'SUKELCO', longitude: 124.6968653, latitude: 6.661264219 },
      { province: 'TAWELCO', longitude: 119.769339, latitude: 5.021865189 },
      { province: 'SIASELCO', longitude: 120.8152175, latitude: 5.546105603 },
      { province: 'SULECO', longitude: 121.0034684, latitude: 6.055508112 },
      { province: 'BASELCO', longitude: 121.9909039, latitude: 6.699196668 },
      { province: 'CASELCO', longitude: 118.4961438, latitude: 6.990560121 },
      { province: 'LASURECO', longitude: 124.3100151, latitude: 8.007004107 },
      { province: 'MAGELCO', longitude: 124.2311531, latitude: 7.157015437 },
      { province: 'ANECO', longitude: 125.5218688, latitude: 8.943153864 },
      { province: 'ASELCO', longitude: 125.9736482, latitude: 8.485434417 },
      { province: 'SIARELCO', longitude: 126.0406144, latitude: 9.764653339 },
      { province: 'SURNECO', longitude: 125.4935896, latitude: 9.782130197 },
      { province: 'DIELCO', longitude: 125.5818164, latitude: 10.01199184 },
      { province: 'SURSECO I', longitude: 126.3581435, latitude: 8.184868606 },
      { province: 'SURSECO II', longitude: 126.1967539, latitude: 9.066046412 },
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
