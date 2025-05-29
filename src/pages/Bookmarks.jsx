import React from "react";
import Navbar from "../components/Navbar";
import CourseList from "../components/CourseList";
import Footer from "../components/Footer";
import { useBookmarks } from "../context/BookmarkContext";

// Example courses data (in a real app, this would come from your backend)
const allCourses = [
  {
    id: 1,
    title: "Advanced Web Development",
    description: "Master modern web technologies and frameworks",
    subject: "Web Development",
    downloadLink: "/materials/advanced-web-dev",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning concepts and applications",
    subject: "Machine Learning",
    downloadLink: "/materials/ml-fundamentals",
  },
  // Add more courses as needed
];

const Bookmarks = () => {
  const { getBookmarkedCourses } = useBookmarks();
  const bookmarkedCourses = getBookmarkedCourses(allCourses);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
            <span className="text-gray-500">
              {bookmarkedCourses.length} saved courses
            </span>
          </div>

          {bookmarkedCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
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
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  No bookmarks yet
                </h2>
                <p className="text-gray-500 mb-6">
                  Start saving courses by clicking the bookmark icon on any
                  course card
                </p>
              </div>
            </div>
          ) : (
            <CourseList courses={bookmarkedCourses} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bookmarks;
