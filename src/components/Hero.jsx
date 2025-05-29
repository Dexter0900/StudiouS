import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] w-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 -ml-[50vw] left-1/2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
          Welcome to StudiouS
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 mb-4">
          Your Ultimate Learning Companion
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Enhance your learning journey with personalized study tools and
          resources
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-indigo-50"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-full opacity-50 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
