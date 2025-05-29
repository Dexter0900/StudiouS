import React from "react";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import Footer from "../components/Footer";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your course materials and content
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Upload New Material
            </h2>
            <UploadForm />
          </div>

          {/* Future sections can be added here */}
          {/* For example: Material Management, User Management, etc. */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
