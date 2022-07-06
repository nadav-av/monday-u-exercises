import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          Dynamo
          <i className="fa-solid fa-chart-simple"></i>
        </NavLink>

        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/tasks" className={"nav-links"}>
              Tasks List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/statistics" className={"nav-links"}>
              Statistics
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={"nav-links"}>
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
