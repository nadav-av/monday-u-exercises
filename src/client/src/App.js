import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ItemClient from "./services/taskService";
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./pages/Tasks/Tasks";
import About from "./pages/About/About";
import Statistics from "./pages/Statistics/Statistics";
import { useDispatch, useSelector } from "react-redux";
import { getTasksAsync } from "./redux/reducers/taskSlice";
import "./App.css";


const App = () => {
  const taskService = new ItemClient();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasksAsync());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/about" element={<About />} exact />
            <Route
              path="/tasks"
              element={
                <Tasks
                  taskService={taskService}
                />
              }
            />
            <Route
              path="/statistics"
              element={<Statistics tasks={tasks} exact />}
            />
            <Route
              path="*"
              element={
                <Tasks
                  taskService={taskService}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
