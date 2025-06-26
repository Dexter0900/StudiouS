import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// Common navigation links
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/bookmarks", label: "Bookmarks" },
  // { to: "/admin", label: "Admin" },
];

const Navbar = () => {
  const auth = getAuth();
  // const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Detect scroll to apply styles
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for auth state changes (user login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return unsubscribe;
  }, [auth]);

  // Logout the current user
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  // Render login/signup when user not logged in
  const renderAuthLinks = () => (
    <>
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium text-white hover:text-purple-200 transition-colors duration-300"
        onClick={() => setIsMenuOpen(false)}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-purple-100 focus:outline-none transition-all duration-300 hover:scale-105"
        onClick={() => setIsMenuOpen(false)}
      >
        Sign Up
      </Link>
    </>
  );

  // Render user info + logout when user is logged in
  const renderUserSection = () => (
    <div className="flex items-center space-x-4 text-white">
      <span className="font-medium">Welcome, {currentUser?.displayName}</span>
      <button
        onClick={() => {
          setIsMenuOpen(false);
          handleLogout();
        }}
        className="px-4 py-2 text-sm font-medium cursor-pointer bg-white text-indigo-600 rounded-md hover:bg-purple-100 transition-all duration-300 hover:scale-105"
      >
        Logout
      </button>
    </div>
  );

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
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-purple-200 transition-colors duration-300 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            StudiouS
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-2 mx-8">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-white hover:text-purple-200 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth/User */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? renderUserSection() : renderAuthLinks()}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (animated dropdown) */}
        <div
          className={`md:hidden flex flex-col items-center space-y-2 pb-4 transition-max-height duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-white hover:text-purple-200 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center space-x-4 mt-2">
            {currentUser ? renderUserSection() : renderAuthLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
