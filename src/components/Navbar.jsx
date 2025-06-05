import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Add these imports

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 👈 for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-purple-600/95 to-indigo-600/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-purple-600 to-indigo-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-purple-200 transition-colors duration-300 cursor-pointer"
            >
              StudiouS
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-2">
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About" />
              <NavLink to="/courses" label="Courses" />
              <NavLink to="/bookmarks" label="Bookmarks" />
              <NavLink to="/admin" label="Admin" />
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white hover:text-purple-200 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-purple-100 focus:outline-none transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-200 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col space-y-2">
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About" />
              <NavLink to="/courses" label="Courses" />
              <NavLink to="/bookmarks" label="Bookmarks" />
              <NavLink to="/admin" label="Admin" />
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-purple-100"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-white hover:text-purple-200 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
  >
    {label}
  </Link>
);

export default Navbar;
