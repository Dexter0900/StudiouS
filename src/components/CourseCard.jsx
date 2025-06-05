import React from "react";
import PropTypes from "prop-types";
import BookmarkButton from "./BookmarkButton";
import { FaExternalLinkAlt } from "react-icons/fa"; // <-- Add this import

const CourseCard = ({
  title,
  description,
  subject,
  downloadLink,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Function to determine badge color based on subject
  const getBadgeColor = (subject) => {
    const colors = {
      "Web Development": "bg-blue-100 text-blue-800",
      "Mobile Development": "bg-purple-100 text-purple-800",
      "Data Science": "bg-green-100 text-green-800",
      "Machine Learning": "bg-red-100 text-red-800",
      "Cloud Computing": "bg-yellow-100 text-yellow-800",
    };

    // Default color if subject doesn't match
    return colors[subject] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-xl border border-gray-200">
      <div className="p-6 space-y-4">
        {/* Subject Badge and Bookmark Button */}
        <div className="flex justify-between items-start">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
              subject
            )}`}
          >
            {subject}
          </span>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggle={onToggleBookmark}
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>

        {/* View Material Button */}
        <div className="pt-4">
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            View Material
            <FaExternalLinkAlt className="ml-2 -mr-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  downloadLink: PropTypes.string.isRequired,
  isBookmarked: PropTypes.bool,
  onToggleBookmark: PropTypes.func,
};

CourseCard.defaultProps = {
  isBookmarked: false,
  onToggleBookmark: () => {},
};

export default CourseCard;
