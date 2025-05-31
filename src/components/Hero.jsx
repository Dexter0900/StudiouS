import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const sections = [
    {
      title: "About Us",
      description: "Learn about our mission to revolutionize education and our commitment to student success.",
      link: "/about",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Our Courses",
      description: "Explore our comprehensive collection of courses designed to help you achieve your learning goals.",
      link: "/courses",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Bookmarks",
      description: "Save your favorite courses and materials for quick access whenever you need them.",
      link: "/bookmarks",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      title: "Contact Us",
      description: "Get in touch with our team for any questions or support you may need.",
      link: "/contact",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-screen flex items-center justify-center -ml-[50vw] left-1/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 
            data-aos="fade-down"
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text"
          >
            Welcome to StudiouS
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-2xl md:text-3xl text-gray-700 mb-4"
          >
            Your Ultimate Learning Companion
          </p>
          <p 
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Enhance your learning journey with personalized study tools and resources
          </p>
          <div 
            data-aos="fade-up"
            data-aos-delay="600"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the features and resources available to enhance your learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{section.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {section.description}
                  </p>
                  <Link
                    to={section.link}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300"
                  >
                    Learn More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-indigo-100">Study Materials</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-indigo-100">Subject Areas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-100">Learning Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            data-aos="fade-up"
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of students who are already learning with StudiouS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                Sign Up Now
              </Link>
              <Link
                to="/courses"
                className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg text-lg font-medium transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-indigo-50"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
