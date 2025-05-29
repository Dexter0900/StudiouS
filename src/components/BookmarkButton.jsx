import React from "react";
import PropTypes from "prop-types";

const BookmarkButton = ({ isBookmarked, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        // Filled bookmark icon
        <svg
          className="w-5 h-5 text-indigo-600 transform transition-transform duration-200 ease-in-out hover:scale-110"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ) : (
        // Outline bookmark icon
        <svg
          className="w-5 h-5 text-gray-500 transform transition-transform duration-200 ease-in-out hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      )}
    </button>
  );
};

BookmarkButton.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default BookmarkButton;
