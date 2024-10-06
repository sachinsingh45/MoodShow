import React, { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser'; // Updated import
import { useSelector } from "react-redux";

const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const userName = useSelector((store) => store.user?.displayName || "Guest");

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    // Log the environment variables to ensure they are being read correctly
    console.log("Service ID:", process.env.REACT_APP_SERVICE_ID);
    console.log("Template ID:", process.env.REACT_APP_TEMPLATE_ID);

    // Ensure the environment variables are defined
    if (!process.env.REACT_APP_SERVICE_ID || !process.env.REACT_APP_TEMPLATE_ID) {
      toast.error("EmailJS configuration is missing. Please check your environment variables.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    // EmailJS configuration
    const templateParams = {
      feedback: feedback,
      from_name: userName,
      to_name: "Sachin Singh",
    };

    console.log("Sending Email with Template Params:", templateParams); // Log template parameters

    // Send feedback via EmailJS
    emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      templateParams
      // Uncomment the line below if you are using User ID
      // , process.env.REACT_APP_USER_ID 
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      toast.success("Feedback submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      setFeedback(""); // Clear the feedback field after submission
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      toast.error("Failed to send feedback. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    });
  };

  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between px-6">
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

      {/* Feedback Form Section */}
      <div className="mt-6 max-w-md mx-auto">
        <h4 className="text-lg font-semibold text-yellow-400 mb-2">Feedback</h4>
        <form onSubmit={handleFeedbackSubmit} className="flex flex-col space-y-4">
          <textarea 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            rows="3" 
            placeholder="Your feedback here..." 
            className="p-2 rounded bg-gray-800 text-white placeholder-gray-400"
            required
          />
          <button 
            type="submit" 
            className="btn-responsive relative inline-block w-full p-2 sm:px-4 md:px-6 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-medium text-white border border-red-600 overflow-hidden group rounded-full font-montserrat"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      <div className="text-center text-sm text-gray-400 mt-4">
        © 2024 MoodShow. All Rights Reserved.
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
