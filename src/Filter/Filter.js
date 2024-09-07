import React from "react";
import "./Filter.css";
const Filter = () => {
  return (
    <div className="filter">
      <div className="filter-container">
        <button className="btn-filter">
          <i className="fas fa-filter"></i>{" "}
        </button>
        <span className="filter-text">Filter</span>
      </div>
      <div className="search-container">
        <span className="search-icon">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          placeholder="Search for books, sections..."
          className="search-input"
        />
      </div>
    </div>
  );
};

export default Filter;
