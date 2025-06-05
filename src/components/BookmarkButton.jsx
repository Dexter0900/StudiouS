import React from "react";
import PropTypes from "prop-types";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const BookmarkButton = ({ isBookmarked, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        <FaBookmark className="w-5 h-5 text-indigo-600 transform transition-transform duration-200 ease-in-out hover:scale-110" />
      ) : (
        <FaRegBookmark className="w-5 h-5 text-gray-500 transform transition-transform duration-200 ease-in-out hover:scale-110" />
      )}
    </button>
  );
};

BookmarkButton.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default BookmarkButton;
