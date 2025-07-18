import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
