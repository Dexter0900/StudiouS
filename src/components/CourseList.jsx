import React from "react";
import PropTypes from "prop-types";
import CourseCard from "./CourseCard";
import { useBookmarks } from "../context/BookmarkContext";

const CourseList = ({ courses }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  if (!courses?.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No courses available
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later for new courses or try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            subject={course.subject}
            downloadLink={course.downloadLink}
            isBookmarked={isBookmarked(course.id)}
            onToggleBookmark={() => toggleBookmark(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      downloadLink: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Example usage:
/*
const courses = [
  {
    id: 1,
    title: "Introduction to Calculus",
    description: "Learn the fundamentals of calculus including limits, derivatives, and integrals.",
    subject: "Math",
    downloadLink: "https://example.com/calculus",
  },
  // ... more courses
];

<CourseList courses={courses} />
*/

export default CourseList;
