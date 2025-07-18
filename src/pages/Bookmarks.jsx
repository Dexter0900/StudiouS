import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseList from "../components/CourseList";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useBookmarks } from "../context/BookmarkContext";
import { FiArrowUp } from "react-icons/fi";
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const Bookmarks = () => {
  const { bookmarkedCourseIds } = useBookmarks(); // update context to expose ids set
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const bookmarkedCourses = allCourses.filter((course) =>
    bookmarkedCourseIds.has(course.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-950">
      <Navbar />

      <div className="h-8 sm:h-16" />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-100">My Bookmarks</h1>
            <span className="text-gray-400">
              {bookmarkedCourses.length} saved courses
            </span>
          </div>

          {loading ? (
            <Loader />
          ) : bookmarkedCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center">
                <svg
                  className="w-16 h-16 text-gray-500 mb-4"
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
                <h2 className="text-xl font-medium text-gray-100 mb-2">
                  No bookmarks yet
                </h2>
                <p className="text-gray-400 mb-6">
                  Start saving courses by clicking the bookmark icon on any
                  course card
                </p>
              </div>
            </div>
          ) : (
            <CourseList courses={bookmarkedCourses} />
          )}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition"
        >
          <FiArrowUp className="w-5 h-5" />
        </button>
      </main>

      <div className="h-8 sm:h-16" />
      <Footer />
    </div>
  );
};

export default Bookmarks;
