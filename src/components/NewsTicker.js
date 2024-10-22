// NewsTicker.js
import React, { useEffect, useState } from 'react';
import '.../css/NewsTicker.css'; // Create a separate CSS file for styling

const NewsTicker = () => {
  const [newsItems, setNewsItems] = useState([]);

  // Sample news data (you can replace this with API call)
  useEffect(() => {
    const sampleNews = [
      "Breaking News: Power outage in Mindanao.",
      "Update: Weather forecast shows a tropical storm approaching Luzon.",
      "Announcement: SCADA maintenance scheduled for next week.",
      "GIS update: Map data for the Philippines has been refreshed."
    ];

    setNewsItems(sampleNews);
  }, []);

  return (
    <div className="news-ticker">
      <div className="news-ticker-content">
        {newsItems.map((news, index) => (
          <span key={index} className="news-ticker-item">{news}</span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
