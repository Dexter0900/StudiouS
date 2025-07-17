import React from "react";
import PropTypes from "prop-types";
import BookmarkButton from "./BookmarkButton";

const CourseCard = ({
  title,
  description,
  subject,
  downloadLink,
  isBookmarked,
  onToggleBookmark,
}) => {
  // 🎨 Badge color based on subject
  const getBadgeColor = (subject) => {
    const colors = {
      "Web Development": "bg-blue-900 text-blue-200",
      "Mobile Development": "bg-purple-900 text-purple-200",
      "Data Science": "bg-green-900 text-green-200",
      "Machine Learning": "bg-red-900 text-red-200",
      "Cloud Computing": "bg-yellow-900 text-yellow-200",
    };
    return colors[subject] || "bg-gray-800 text-gray-200"; // fallback
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-800 hover:scale-105 hover:shadow-xl transition-transform duration-300">
      <div className="p-6 space-y-4">
        {/* Badge + Bookmark */}
        <div className="flex justify-between items-start">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
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
        <h3 className="text-xl font-bold text-gray-100 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-3">{description}</p>

        {/* View Material */}
        <div className="pt-4">
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            View Material
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// ✅ PropTypes
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
