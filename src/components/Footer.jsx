import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [isActive, setIsActive] = React.useState(false);
  const toggleActive = () => setIsActive(!isActive);

  // Stop Scroll Behaviour
  React.useEffect(() => {
    if (isActive) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isActive]);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">StudiouS</h3>
            <p className="text-sm">
              Empowering learners worldwide with comprehensive educational
              resources and tools for success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white" aria-label="Facebook">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white" aria-label="Twitter">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white" aria-label="GitHub">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white" aria-label="LinkedIn">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Our Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <button
                  onClick={toggleActive}
                  className="hover:text-white cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and educational
              resources.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} StudiouS. All rights reserved.
          </p>
        </div>
      </div>
      {/* Contact Us Pop Up */}
      <div
        className={`fixed top-0 flex items-center justify-center w-full h-screen bg-clip-padding backdrop-filter backdrop-blur-sm duration-300 z-50 ${
          isActive ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } `}
        aria-modal="true"
        role="dialog"
      >
        <div className="p-4">
          <ContactForm setIsActive={toggleActive} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
