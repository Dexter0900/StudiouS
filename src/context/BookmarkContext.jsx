import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  // Initialize bookmarks from localStorage if available
  const [bookmarkedCourses, setBookmarkedCourses] = useState(() => {
    const saved = localStorage.getItem("bookmarkedCourses");
    try {
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "bookmarkedCourses",
      JSON.stringify([...bookmarkedCourses])
    );
  }, [bookmarkedCourses]);

  const toggleBookmark = (courseId) => {
    setBookmarkedCourses((prev) => {
      const updated = new Set(prev);
      if (updated.has(courseId)) {
        updated.delete(courseId);
      } else {
        updated.add(courseId);
      }
      return updated;
    });
  };

  const isBookmarked = (courseId) => {
    return bookmarkedCourses.has(courseId);
  };

  const getBookmarkedCourses = (allCourses) =>
    allCourses.filter((course) => bookmarkedCourses.has(course.id));

  return (
    <BookmarkContext.Provider
      value={{
        toggleBookmark,
        isBookmarked,
        getBookmarkedCourses,
        bookmarkedCourseIds: bookmarkedCourses,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

BookmarkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookmarkContext;
