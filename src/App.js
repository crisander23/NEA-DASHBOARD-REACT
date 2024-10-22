import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer component
import MainPage from './pages/MainPage';
import ChartView from './pages/ChartView';
import Drilldown from './pages/Drilldown';
import Weather from './pages/Weather';
import ScadaLive from './pages/ScadaLive';
import GISLive from './pages/GISLive';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar stays fixed at the top */}
        <Navbar />  
        
        <div className="page-content">
          <Routes>
            {/* Redirect from / to /home */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/chartview" element={<ChartView />} />
            <Route path="/drilldown" element={<Drilldown />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/scada" element={<ScadaLive />} />
            <Route path="/gis" element={<GISLive />} />
          </Routes>
        </div>
        
        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
