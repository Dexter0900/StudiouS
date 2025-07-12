import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaBookOpen,
  FaLaptopCode,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const offers = [
  {
    icon: <FaBookOpen className="h-10 w-10 text-indigo-400" />,
    title: "Course Materials",
    desc: "Comprehensive study materials across various subjects",
  },
  {
    icon: <FaLaptopCode className="h-10 w-10 text-indigo-400" />,
    title: "Online Learning",
    desc: "Interactive learning experience with modern tools",
  },
  {
    icon: <FaUsers className="h-10 w-10 text-indigo-400" />,
    title: "Community",
    desc: "Connect with fellow learners and educators",
  },
  {
    icon: <FaCheckCircle className="h-10 w-10 text-indigo-400" />,
    title: "Quality Assurance",
    desc: "Verified and curated educational content",
  },
];

const stats = [
  { value: "1000+", label: "Study Materials" },
  { value: "50+", label: "Subject Areas" },
  { value: "24/7", label: "Learning Access" },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-950">
      <Navbar />
      {/* Top Spacer for Navbar */}
      <div className="h-8 sm:h-16" />
      <main className="flex-grow py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-100 mb-4">
              About StudiouS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Empowering learners worldwide with comprehensive educational
              resources and tools for success.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl">
              At StudiouS, we believe that quality education should be
              accessible to everyone. Our platform is designed to provide
              students with the tools and resources they need to succeed in
              their academic journey.
            </p>
            <ul className="space-y-3 text-gray-300 pl-4">
              <li className="flex items-center">
                <span className="inline-block text-indigo-400 mr-2">✔️</span>
                Provide high-quality educational materials
              </li>
              <li className="flex items-center">
                <span className="inline-block text-indigo-400 mr-2">✔️</span>
                Support diverse learning styles
              </li>
              <li className="flex items-center">
                <span className="inline-block text-indigo-400 mr-2">✔️</span>
                Foster a collaborative learning environment
              </li>
            </ul>
          </section>

          {/* What We Offer Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {offers.map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center border border-gray-700"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section>
            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl p-8 text-white grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-indigo-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {/* Bottom Spacer for Footer */}
      <div className="h-8 sm:h-16" />
      <Footer />
    </div>
  );
};

export default About;
