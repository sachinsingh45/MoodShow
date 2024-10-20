import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const Footer = () => {
  const userName = useSelector((store) => store.user?.displayName || "Guest");

  return (
    <footer className="w-full bg-gradient-to-t from-black to-gray-900 text-white py-8 px-10 py-32">
      <div className="w-full mx-auto flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/"> 
            <img
              src="/logo.png"
              alt="App Logo"
              className="w-32 h-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-yellow-400 mb-2">Contact Me</h4>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-yellow-400" />
            <span>sachinsingh16404@gmail.com</span>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex space-x-6">
          <a 
            href="https://github.com/sachinsingh45" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="rounded hover:bg-white transition-all"
          >
            <FaGithub className="text-yellow-400 text-2xl hover:text-black transition-all" />
          </a>
          <a 
            href="https://linkedin.com/in/sachinsingh45" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="rounded hover:bg-white transition-all"
          >
            <FaLinkedin className="text-yellow-400 text-2xl hover:text-blue-700 transition-all" />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-4 w-full">
        © 2024 MoodShow. All Rights Reserved.
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
