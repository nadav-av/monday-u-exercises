import React from "react";
import "./actionBar.css";
import SearchBar from "./SearchBarConnector";
import StatusFilter from "./statusFilterConnector";

const ActionBar = () => {
  return (
    <div className="actions">
      <SearchBar/>
      <StatusFilter/>
    </div>
  );
};

export default ActionBar;
