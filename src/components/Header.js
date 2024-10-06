import React, { useState, useEffect, useRef } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice.js";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants.js";
import { FaHome, FaBrain } from "react-icons/fa"; // Importing icons

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  // State to manage visibility of logout option
  const [showLogout, setShowLogout] = useState(false);
  const avatarRef = useRef(null); // Reference to the avatar

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  // Close logout option when clicking outside
  const handleClickOutside = (event) => {
    if (avatarRef.current && !avatarRef.current.contains(event.target)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Adding event listener for clicks outside the avatar
    document.addEventListener("click", handleClickOutside);
    return () => {
      unsubscribe();
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, navigate]);

  return (
    <header className="bg-gradient-to-b from-black fixed w-full top-0 flex items-center justify-between px-4 py-1 z-50 backdrop-blur-lg border-b border-gray-600 shadow-lg transition-all duration-300 h-16">
      <div className="flex items-center space-x-4">
        <img
          src="logo.png"
          alt="logo"
          className="w-28 h-auto p-1 rounded-lg object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          {showGPTSearch && (
            <div className="relative">
              <select
                className="p-1 m-1 bg-gray-900 text-white rounded"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    <span className="flex items-center">
                      <img
                        src={`path_to_icons/${lang.icon}`} // Use the icon's path here
                        alt={lang.name}
                        className="w-4 h-4 mr-1"
                      />
                      {lang.name}
                    </span>
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Conditionally render My Mood or Home button */}
          <button
            onClick={handleGPTSearchClick}
            className={`relative px-3 py-1 font-bold text-white rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center space-x-2 ${
              showGPTSearch
                ? "bg-gray-900"
                : "bg-gradient-to-r from-purple-800 to-red-600 bg-[length:200%_200%] animate-gradientMove hover:from-purple-700 hover:to-red-500"
            }`}
          >
            {showGPTSearch ? (
              <>
                <FaHome className="w-5 h-5 text-white" />
                <span className="hidden md:inline text-sm font-semibold drop-shadow-md">Home</span>
              </>
            ) : (
              <>
                <FaBrain className="w-5 h-5 text-yellow-400" />
                <span className="hidden md:inline text-sm font-semibold text-yellow-400 drop-shadow-md">
                  My Mood
                </span>
              </>
            )}
          </button>

          {/* Avatar with click event */}
          <div ref={avatarRef} className="relative cursor-pointer" onClick={toggleLogout}>
            <img
              src={user?.photoURL}
              alt="User Icon"
              className="w-8 h-8 rounded-full object-cover border border-gray-400 transition-transform duration-300 hover:scale-110"
            />
            {showLogout && (
              <div className="absolute right-0 mt-2 bg-gray-800 text-white p-2 rounded-md shadow-lg z-10">
                <button
                  onClick={handleSignOut}
                  className="mt-1 px-2 py-1 bg-red-600 text-white font-bold rounded-md transition-all duration-300 hover:bg-red-700"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media Queries */}
      <style jsx>{`
        @media (max-width: 768px) {
          .space-x-4 {
            space-x-2;
          }
          button {
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
          }
          button span {
            display: none; /* Hide text on small screens */
          }
          img {
            width: 24px;
            height: 24px;
          }
          .w-8 {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
