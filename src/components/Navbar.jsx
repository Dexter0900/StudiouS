import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const MagneticNavLink = ({ to, children }) => {
  const linkRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!linkRef.current) return;
    
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate distance from center with a larger activation region (100px)
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 100; // Increased activation region
    
    if (distance < maxDistance) {
      // Increased strength for more noticeable effect
      const strength = (1 - distance / maxDistance) * 25;
      const angle = Math.atan2(y, x);
      const moveX = Math.cos(angle) * strength;
      const moveY = Math.sin(angle) * strength;
      
      setPosition({ x: moveX, y: moveY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={linkRef}
        to={to}
        className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 block"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {children}
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-gradient-to-r from-purple-600/95 to-indigo-600/95 backdrop-blur-md shadow-lg" 
        : "bg-gradient-to-r from-purple-600 to-indigo-600"
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-purple-200 transition-colors duration-300 cursor-pointer"
            >
              StudiouS
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              <MagneticNavLink to="/">Home</MagneticNavLink>
              <MagneticNavLink to="/about">About</MagneticNavLink>
              <MagneticNavLink to="/courses">Courses</MagneticNavLink>
              <MagneticNavLink to="/contact">Contact</MagneticNavLink>
              <MagneticNavLink to="/bookmarks">Bookmarks</MagneticNavLink>
              <MagneticNavLink to="/admin">Admin</MagneticNavLink>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white hover:text-purple-200 focus:outline-none transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-200 focus:outline-none transition-colors duration-300">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
