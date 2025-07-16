import React, { useState } from "react";
import { auth, db } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const SignupForm = ({ onClose, openLoginModal }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname || formData.firstname.length < 2) {
      newErrors.firstname = "First name must be at least 2 characters";
    }
    if (!formData.lastname || formData.lastname.length < 2) {
      newErrors.lastname = "Last name must be at least 2 characters";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Must include uppercase, lowercase, and a number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrors({});

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
        displayName: formData.firstname,
      });

      await user.reload();

      await setDoc(doc(db, "users", user.uid), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        createdAt: new Date(),
      });

      setSuccessMessage("Account created successfully!");
      setFormData({ firstname: "", lastname: "", email: "", password: "" });
      onClose?.();
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
        {/* Close Button */}
        {onClose && (
          <button
            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}

        <h2 className="text-center text-3xl font-extrabold text-gray-100 mb-6">
          Create a new account
        </h2>

        {errors.submit && (
          <div className="rounded-md bg-red-900/30 p-4 mb-4">
            <p className="text-sm text-red-300">{errors.submit}</p>
          </div>
        )}

        {successMessage && (
          <div className="rounded-md bg-green-900/30 p-4 mb-4">
            <p className="text-sm text-green-300">{successMessage}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { name: "firstname", label: "First Name", type: "text" },
            { name: "lastname", label: "Last Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-200"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                autoComplete={name}
                required
                value={formData[name]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors[name] ? "border-red-400" : "border-gray-700"
                } rounded-md sm:text-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              {errors[name] && (
                <p className="text-sm text-red-400 mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <p className="text-xs text-gray-400">
            Password must include uppercase, lowercase, number & ≥ 6 characters.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose?.();
              openLoginModal?.();
            }}
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
export default SignupForm;
