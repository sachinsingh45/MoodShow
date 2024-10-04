import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 flex flex-col p-8 pt-32 bg-transparent">
      <div className=" text-white p-8 rounded-lg  transition-shadow duration-300 ease-in-out max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 ease-in-out font-montserrat">
          {title}
        </h1>
        <p className="text-lg text-gray-300 mb-8 font-montserrat">
          {overview}
        </p>
        <div className="flex space-x-6">
          <button className="relative inline-block px-6 py-3 font-medium text-white border border-red-600 overflow-hidden group rounded-full font-montserrat">
            <span className="absolute inset-0 bg-red-600 transition-transform transform translate-x-full group-hover:translate-x-0 ease-in-out duration-300"></span>
            <span className="relative z-10">▶ Play</span>
          </button>
          <button className="relative inline-block px-6 py-3 font-medium text-red-700 border border-yellow-400 overflow-hidden group rounded-full font-montserrat">
            <span className="absolute inset-0 bg-yellow-400 transition-transform transform -translate-x-full group-hover:translate-x-0 ease-in-out duration-300"></span>
            <span className="relative z-10">ⓘ More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoTitle;
