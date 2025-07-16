import React from "react";
import { useLoginFormLogic } from "./LoginFormLogic";

const LoginForm = ({ onClose, openSignupModal }) => {
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
  } = useLoginFormLogic(onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
        {/* Close Button */}
        {onClose && (
          <button
            className="absolute top-2 right-2 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}

        <h2 className="text-center text-3xl font-extrabold text-gray-100">
          {showReset ? "Reset your password" : "Login to your account"}
        </h2>

        {!showReset ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="rounded-md bg-red-900/30 p-4">
                <p className="text-sm text-red-300">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-4">
              {["email", "password"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-200 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    type={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border ${
                      errors[field] ? "border-red-400" : "border-gray-700"
                    } rounded-md sm:text-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder={`Enter your ${field}`}
                  />
                  {errors[field] && (
                    <p className="text-sm text-red-400 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end text-sm">
              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300"
                onClick={() => setShowReset(true)}
              >
                Forgot your password?
              </button>
            </div>

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
          <form onSubmit={handleResetPassword} className="space-y-4 mt-8">
            <label className="block text-sm font-medium text-gray-200">
              Enter your email to reset password
            </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md sm:text-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter email"
            />
            {resetError && <p className="text-sm text-red-400">{resetError}</p>}
            {resetMessage && (
              <p className="text-sm text-green-400">{resetMessage}</p>
            )}

            <div className="flex justify-end text-sm">
              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300"
                onClick={() => setShowReset(false)}
              >
                Login?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
            >
              Send Reset Email
            </button>
          </form>
        )}

        {!showReset && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose?.();
                openSignupModal?.();
              }}
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
