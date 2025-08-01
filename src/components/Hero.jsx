import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowUp } from "react-icons/fi";
import {
  FaInfoCircle,
  FaBookOpen,
  FaBookmark,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Hero = ({ setShowSignupModal }) => {
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setLoggedIn(true);
      else setLoggedIn(false);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const sections = [
    {
      title: "About Us",
      description:
        "Learn about our mission to revolutionize education and our commitment to student success.",
      link: "/about",
      icon: <FaInfoCircle className="w-12 h-12 text-indigo-600" />,
    },
    {
      title: "Our Courses",
      description:
        "Explore our comprehensive collection of courses designed to help you achieve your learning goals.",
      link: "/courses",
      icon: <FaBookOpen className="w-12 h-12 text-indigo-600" />,
    },
    {
      title: "Bookmarks",
      description:
        "Save your favorite courses and materials for quick access whenever you need them.",
      link: "/bookmarks",
      icon: <FaBookmark className="w-12 h-12 text-indigo-600" />,
    },
    {
      title: "Contact Us",
      description:
        "Get in touch with our team for any questions or support you may need.",
      link: "/contact",
      icon: <FaEnvelope className="w-12 h-12 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-screen flex items-center justify-center -ml-[50vw] left-1/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1
            data-aos="fade-down"
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 inline-block text-transparent bg-clip-text"
          >
            Welcome to StudiouS
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-2xl md:text-3xl text-gray-200 mb-4"
          >
            Your Ultimate Learning Companion
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Enhance your learning journey with personalized study tools and
            resources
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {loggedIn ? (
              <Link
                to="/courses"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Learning
              </Link>
            ) : (
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                Get Started
              </button>
            )}
            <Link
              to="/about"
              className="px-8 py-3 border-2 border-indigo-400 text-indigo-300 rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-indigo-900/30"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-900 to-blue-900 rounded-full opacity-40 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Explore Our Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover all the features and resources available to enhance your
              learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {React.cloneElement(section.icon, {
                      className: "w-12 h-12 text-indigo-400",
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{section.description}</p>
                  <Link
                    to={section.link}
                    className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-indigo-300 bg-indigo-900/30 hover:bg-indigo-900/60 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:border hover:border-gray-500"
                  >
                    <span className="inline-flex items-center">
                      Learn More <FaArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-indigo-200">Study Materials</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-indigo-200">Subject Areas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-200">Learning Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up" className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of students who are already learning with StudiouS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                Sign Up Now
              </button>
              <Link
                to="/courses"
                className="px-8 py-3 border-2 border-indigo-400 text-indigo-300 rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-indigo-900/30"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Hero;
