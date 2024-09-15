import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidity } from '../utils/Validate';

const Login = () => {
  // State to track whether it's Sign In or Sign Up mode
  const [isSignUp, setIsSignUp] = useState(false);
  
  // State to track error message
  const [errorMessage, setErrorMessage] = useState('');

  // Toggle between Sign In and Sign Up
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidity(email.current.value, password.current.value);

    if (message) {
      // Set error message if validation fails
      setErrorMessage(message);
    } else {
      // Clear error message if valid
      setErrorMessage('');
      console.log("Form submitted successfully");
    }
  };

  const email = useRef(null);
  const password = useRef(null);

  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('bg.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
      <Header />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 mt-10 rounded-lg max-w-md w-full text-white backdrop-blur">
          {/* Dynamic Title */}
          <h2 className="text-3xl font-bold mb-6">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="mb-4">
              <input
                ref={email}
                type="email"
                placeholder="Email or phone number"
                className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Conditional Inputs for Sign Up */}
            {isSignUp && (
              <div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 text-red-500 font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
              onClick={handleButtonClick}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Sign In/Sign Up Switch */}
          <div className="mt-8">
            {isSignUp ? (
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={toggleAuthMode}
                  className="text-white hover:underline">
                  Sign In
                </button>.
              </p>
            ) : (
              <p className="text-gray-400">
                New to MoodShow?{' '}
                <button
                  onClick={toggleAuthMode}
                  className="text-white hover:underline">
                  Sign Up now
                </button>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
