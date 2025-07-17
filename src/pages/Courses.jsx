import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DropdownFilter from "../components/DropdownFilter";
import CourseList from "../components/CourseList";
import Footer from "../components/Footer";
import { FiArrowUp } from "react-icons/fi";
import { data } from "react-router-dom";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [courses, setCourses] = useState([]);

  const filterOptions = [
    "All",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
  ];

  // 🔷 Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCourses(data);
      console.log("Courses fetched:", data);
    };
    fetchCourses();
  }, []);

  // 🔷 Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // 🔷 Filter handler
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // 🔷 Filtered list based on search & category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" || course.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-950">
      <Navbar />

      {/* Top Spacer */}
      <div className="h-8 sm:h-16" />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-100 mb-8">Our Courses</h1>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search courses..."
                inputClassName="bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="w-full sm:w-48">
              <DropdownFilter
                options={filterOptions}
                selected={selectedFilter}
                onChange={handleFilterChange}
                label="Filter by category"
                selectClassName="bg-gray-800 text-gray-100 border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Course List */}
          <CourseList courses={filteredCourses} />
        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
        >
          <FiArrowUp className="w-5 h-5" />
        </button>
      </main>

      {/* Bottom Spacer */}
      <div className="h-8 sm:h-16" />
      <Footer />
    </div>
  );
};

export default Courses;
