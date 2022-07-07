import React from "react";
import "./actionBar.css";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";

const ActionBar = ({ searchInput, setSearchInput, setFilter }) => {
  return (
    <div className="actions">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <StatusFilter setFilter={setFilter} />
    </div>
  );
};

export default ActionBar;
