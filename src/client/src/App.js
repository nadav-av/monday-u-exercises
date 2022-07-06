import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ItemClient from "./services/taskService";
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./pages/Tasks/Tasks";
import About from "./pages/About/About";
import Statistics from "./pages/Statistics/Statistics";
import NotFound from "./pages/NotFound/NotFound";


import "./App.css";


const App = () => {
  const compare = (a, b) => {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Tasks exact />} />
            <Route path="/about" element={<About />} exact />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/statistics" element={<Statistics exact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
