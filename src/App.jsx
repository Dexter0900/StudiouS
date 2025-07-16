import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Courses from "./pages/Courses";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";
import { BookmarkProvider } from "./context/BookmarkContext";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <BookmarkProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar setShowSignupModal={setShowSignupModal} />
                <main className="relative overflow-hidden flex-grow">
                  <Hero setShowSignupModal={setShowSignupModal} />
                  {showSignupModal && (
                    <SignupForm
                      onClose={() => setShowSignupModal(false)}
                      openLoginModal={() => {
                        setShowSignupModal(false);
                        setShowLoginModal(true);
                      }}
                    />
                  )}

                  {showLoginModal && (
                    <LoginForm onClose={() => setShowLoginModal(false)} />
                  )}
                </main>
                <Footer />
              </div>
            }
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
}

export default App;
