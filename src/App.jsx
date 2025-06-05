import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import Bookmarks from "./pages/Bookmarks";
import Admin from "./pages/Admin";
import About from "./pages/About";
import ContactForm from "./components/ContactForm";
import { BookmarkProvider } from "./context/BookmarkContext";

function App() {
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
    <BookmarkProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="relative overflow-hidden flex-grow">
                  <Hero />
                </main>
                <Footer setIsActive={toggleActive} />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>

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
    </BookmarkProvider>
  );
}

export default App;
