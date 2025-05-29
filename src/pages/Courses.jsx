import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import DropdownFilter from "../components/DropdownFilter";
import CourseList from "../components/CourseList";
import Footer from "../components/Footer";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterOptions = [
    "All",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
  ];

  // Example course data (replace with your actual data)
  const courses = [
    {
      id: 1,
      title: "Modern Web Development",
      description: "Learn the latest web technologies and frameworks",
      subject: "Web Development",
      downloadLink: "/materials/web-dev",
    },
    {
      id: 2,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile applications",
      subject: "Mobile Development",
      downloadLink: "/materials/react-native",
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Introduction to data analysis and visualization",
      subject: "Data Science",
      downloadLink: "/materials/data-science",
    },
    // Add more courses as needed
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Filter courses based on search query and selected filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || course.subject === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Courses</h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search courses..."
              />
            </div>
            <div className="w-full sm:w-48">
              <DropdownFilter
                options={filterOptions}
                selected={selectedFilter}
                onChange={handleFilterChange}
                label="Filter by category"
              />
            </div>
          </div>

          <CourseList courses={filteredCourses} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
