import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoTitle = ({ title, overview, id }) => {
  const maxLength = 160;
  const navigate = useNavigate();
  const truncatedOverview = overview.length > maxLength
    ? overview.substring(0, maxLength) + '...'
    : overview;

  return (
    <div className="absolute inset-0 flex flex-col p-2 sm:ml-8 sm:py-8 mt-28 bg-transparent">
      <div className="text-white p-4 rounded-lg transition-shadow duration-300 ease-in-out max-w-lg w-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 ease-in-out font-montserrat">
          {title}
        </h1>
        <p className="text-sm md:text-lg text-gray-300 mb-3 sm:mb-8 font-montserrat">
          {truncatedOverview}
        </p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate(`/browse/watch/${id}`)}
            className="btn-responsive relative inline-block w-full sm:w-auto p-2 sm:px-4 md:px-6 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-medium text-white border border-red-600 overflow-hidden group rounded-full font-montserrat"
          >
            <span className="absolute inline inset-0 bg-red-600 transition-transform transform translate-x-full group-hover:translate-x-0 ease-in-out duration-300"></span>
            <span className="relative inline z-10">▶ Play</span>
          </button>
          <button
            onClick={() => navigate(`/browse/watch/${id}`)}
            className="btn-responsive relative inline-block w-full sm:w-auto p-2 sm:px-4 md:px-6 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-medium text-red-700 border border-yellow-400 overflow-hidden group rounded-full font-montserrat"
          >
            <span className="absolute inline inset-0 bg-yellow-400 transition-transform transform -translate-x-full group-hover:translate-x-0 ease-in-out duration-300"></span>
            <span className="relative inline z-10">ⓘ More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
