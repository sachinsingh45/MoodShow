// LoginSkimmer.js
import React from 'react';
import ScrollToTop from './ScrollToTop';

const LoginSkimmer = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <ScrollToTop/>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-bold">Are you sure you want to logout?</h2>
        <div className="mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSkimmer;
