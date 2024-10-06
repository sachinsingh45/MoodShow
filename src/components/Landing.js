import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import ScrollToTop from "./ScrollToTop";

const testimonials = [
  {
    name: "Alice Johnson",
    feedback: "Mood Show changed the way I choose movies! It's so easy to find what I'm in the mood for.",
  },
  {
    name: "John Doe",
    feedback: "I love the personalized recommendations! It feels like the app knows me.",
  },
  {
    name: "Sarah Smith",
    feedback: "Great interface and amazing movie selection! Highly recommended.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div>
      <ScrollToTop />
      <Header />
      <div className="relative h-screen flex flex-col items-center justify-center w-full bg-cover bg-center bg-fixed text-white" style={{ backgroundImage: "url('bg.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-75 -z-1" />
        <div className="text-center space-y-8 z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Welcome to Mood Show</h1>
          <p className="text-lg md:text-xl">Discover movies based on your mood.</p>
          <motion.button
            onClick={handleGetStarted}
            className="px-5 py-2 md:px-6 md:py-3 font-bold text-white rounded-lg bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 transition-transform duration-300 hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-10 text-center bg-gradient-to-b from-red-800 to-gray-800 text-white">
        <h2 className="text-3xl font-bold mb-5">How It Works</h2>
        <p className="mb-4">Follow these simple steps to get personalized movie recommendations.</p>
        <div className="flex flex-col md:flex-row justify-center md:justify-around">
          {["Sign Up", "Choose Your Mood", "Enjoy Movies"].map((step, index) => (
            <motion.div
              className="flex flex-col items-center mb-6 md:mb-4 mx-4" 
              key={index}
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">{index + 1}</span>
              </div>
              <h3 className="font-bold">{step}</h3>
              <p className="text-sm md:text-base">{index === 0 ? "Create an account to start exploring." : index === 1 ? "Select how you’re feeling to get tailored recommendations." : "Start watching and enjoy movies that match your mood!"}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-10 text-center bg-gray-800 text-white">
        <h2 className="text-3xl font-bold mb-5">Key Features:</h2>
        <ul className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-10">
          <li className="bg-yellow-500 rounded-lg p-4 text-lg md:w-1/4">Personalized movie recommendations</li>
          <li className="bg-yellow-500 rounded-lg p-4 text-lg md:w-1/4">Search and filter movies by mood in your language</li>
        </ul>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10">
        <h2 className="text-center text-3xl font-bold mb-5">What Our Users Say</h2>
        <div className="flex flex-col items-center">
          <motion.div
            className="text-center px-6 py-4 border border-yellow-500 rounded-lg max-w-md shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="italic">"{testimonials[currentTestimonialIndex].feedback}"</p>
            <h3 className="mt-4 font-bold">{testimonials[currentTestimonialIndex].name}</h3>
          </motion.div>
          <motion.button
            onClick={nextTestimonial}
            className="mt-4 px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Next Testimonial
          </motion.button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
