// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../images/logo.png'; // Import the image logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="logo" className="navbar-logo-img" /> {/* Image logo */}
        <span className="navbar-title">DASHBOARD CENTER</span> {/* Text logo */}
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            Main Page
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink 
            to="/chartview" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            Chart View
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink 
            to="/drilldown" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            Drilldown
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink 
            to="/weather" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            Weather
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink 
            to="/scada" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            SCADA Live
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink 
            to="/gis" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
          >
            GIS Live
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
