import React from "react";
import { useLoginFormLogic } from "./LoginFormLogic";

const LoginForm = () => {
  // Destructure state and handlers from custom hook
  const {
    formData,
    errors,
    isSubmitting,
    showReset,
    resetEmail,
    resetMessage,
    resetError,
    handleChange,
    handleSubmit,
    handleResetPassword,
    setShowReset,
    setResetEmail,
  } = useLoginFormLogic();

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {/* Form Title */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {showReset ? "Reset your password" : "Login to your account"}
        </h2>

        {/* Login Form */}
        {!showReset ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Global submission error */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            )}

            {/* Email & Password Fields */}
            <div className="space-y-4">
              {["email", "password"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    type={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border ${
                      errors[field] ? "border-red-300" : "border-gray-300"
                    } rounded-md sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder={`Enter your ${field}`}
                  />
                  {/* Field-level validation error */}
                  {errors[field] && (
                    <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Forgot Password Button */}
            <div className="flex justify-end text-sm">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => setShowReset(true)}
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          // Password Reset Form
          <form onSubmit={handleResetPassword} className="space-y-4 mt-8">
            <label className="block text-sm font-medium text-gray-700">
              Enter your email to reset password
            </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter email"
            />
            {/* Password reset errors & messages */}
            {resetError && <p className="text-sm text-red-600">{resetError}</p>}
            {resetMessage && (
              <p className="text-sm text-green-600">{resetMessage}</p>
            )}

            {/* Return to login link */}
            <div className="flex justify-end text-sm">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => setShowReset(false)}
              >
                Login?
              </button>
            </div>

            {/* Submit password reset */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 text-sm"
            >
              Send Reset Email
            </button>
          </form>
        )}

        {/* Signup link (only in login mode) */}
        {!showReset && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
