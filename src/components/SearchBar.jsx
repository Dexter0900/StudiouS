import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base text-gray-900 placeholder-gray-400 bg-white shadow-sm transition duration-150 ease-in-out"
        placeholder={placeholder || "Search..."}
        aria-label={placeholder || "Search"}
      />

      {/* Clear Button */}
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <FaTimes className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
