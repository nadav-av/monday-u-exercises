import React, { useCallback } from "react";

import "./searchBar.css";

const SearchBar = ({ searchInput, setSearchInputAction }) => {
  const setSearchInput = useCallback(
    (e) => {
      setSearchInputAction(e.target.value);
    },
    [setSearchInputAction]
  );


  return (
    <div className="search">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        className="input search-input"
        type="text"
        placeholder="search"
        value={searchInput}
        onChange={setSearchInput}
      />
    </div>
  );
};

export default SearchBar;
