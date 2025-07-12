import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";
import Footer from "./Footer"; // Adjust path if needed

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname) {
      newErrors.firstname = "Name is required";
    } else if (formData.firstname.length < 2) {
      newErrors.firstname = "Name must be at least 2 characters";
    }

    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
    } else if (formData.lastname.length < 2) {
      newErrors.lastname = "Last name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${formData.firstname}`,
      });

      await setDoc(doc(db, "users", user.uid), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        createdAt: new Date(),
      });

      setFormData({ firstname: "", lastname: "", email: "", password: "" });
      setErrors({});
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-950">
      {/* Top Spacer for Navbar */}
      <div className="h-8 sm:h-16" />
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
              Create a new account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="rounded-md bg-red-900/30 p-4 mb-2">
                <p className="text-sm text-red-300">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Name Field */}
              <>
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-200"
                  >
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      autoComplete="firstname"
                      required
                      value={formData.firstname}
                      onChange={handleChange}
                      className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.firstname ? "border-red-400" : "border-gray-700"
                      } placeholder-gray-400 text-gray-100 bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.firstname}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.lastname}
                      onChange={handleChange}
                      className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.lastname ? "border-red-400" : "border-gray-700"
                      } placeholder-gray-400 text-gray-100 bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>
              </>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.email ? "border-red-400" : "border-gray-700"
                    } placeholder-gray-400 text-gray-100 bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.password ? "border-red-400" : "border-gray-700"
                    } placeholder-gray-400 text-gray-100 bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Password must be at least 6 characters and include uppercase,
                  lowercase, and numbers
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Creating account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Spacer for Footer */}
      <div className="h-8 sm:h-16" />
      <Footer />
    </div>
  );
};

export default SignupForm;
