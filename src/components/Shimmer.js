// Shimmer.js
import React from "react";

const Shimmer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 lg:p-6">
      {/* Trailer and Title/Overview Section */}
      <div className="flex flex-col lg:flex-row items-start w-full max-w-6xl mb-12">
        {/* Shimmer effect for trailer */}
        <div className="w-full lg:w-2/3 h-auto lg:h-auto relative mb-8 lg:mb-0 shimmer">
          <div className="bg-gray-700 animate-pulse h-64 rounded-lg"></div>
        </div>

        {/* Title and Overview Section */}
        <div className="w-full lg:w-1/3 lg:ml-8 flex flex-col justify-center">
          <div className="bg-gray-700 animate-pulse h-10 w-1/2 mb-4 rounded-lg"></div>
          <div className="bg-gray-700 animate-pulse h-6 w-full mb-4 rounded-lg"></div>
          <div className="bg-gray-700 animate-pulse h-6 w-3/4 mb-4 rounded-lg"></div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <div className="bg-gray-700 animate-pulse h-14 w-14 mb-4 rounded-full"></div>
            <div className="bg-gray-700 animate-pulse h-6 w-3/4 mb-2 rounded-lg"></div>
            <div className="bg-gray-700 animate-pulse h-6 w-1/2 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
