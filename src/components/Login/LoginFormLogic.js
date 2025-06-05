import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

export const useLoginFormLogic = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  // Auto-redirect if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual field errors as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setResetMessage("");
    setResetError("");

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Successful login redirects from onAuthStateChanged
    } catch (error) {
      let friendlyMsg = error.message;
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-password" ||
        error.code === "auth/user-not-found"
      ) {
        friendlyMsg = "Invalid email or password. Please try again.";
      }
      setErrors({ submit: friendlyMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle forgot password logic
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setResetError("");

    if (!resetEmail) {
      setResetError("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      let friendlyMsg = error.message;
      if (error.code === "auth/user-not-found") {
        friendlyMsg = "No user found with this email.";
      }
      setResetError(friendlyMsg);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    showReset,
    resetEmail,
    resetMessage,
    resetError,
    setShowReset,
    setResetEmail,
    handleChange,
    handleSubmit,
    handleResetPassword,
  };
};
