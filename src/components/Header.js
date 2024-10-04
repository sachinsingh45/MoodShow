import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice.js";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants.js";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGptSearch);
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
    return () => unsubscribe();
  }, []);
  return (
    <div className="bg-gradient-to-b from-black absolute w-full top-0 flex items-center justify-between px-10 py-4  z-50">
      <img
        src="logo.png"
        alt="logo"
        className="w-40 h-auto p-2 rounded-lg object-contain transition-transform duration-300 hover:scale-105"
      />
      {user && (
        <div className="flex items-center space-x-4 p-2">
          {showGPTSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGPTSearchClick}
            className="relative px-5 py-3 font-bold text-white rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-r from-purple-800 to-red-600 bg-[length:200%_200%] animate-gradientMove hover:bg-gradient-to-r hover:from-purple-700 hover:to-red-500"
          >
            {showGPTSearch ? (
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-white rounded-full">
                  <img
                    src="gpt-icon.webp"
                    alt="GPT Icon"
                    className="w-6 h-6 rounded-full"
                  />
                </div>
                <span className="text-lg font-semibold text-yellow-400 drop-shadow-md">
                  My Mood
                </span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-yellow-400 drop-shadow-md">
                Home
              </span>
            )}
          </button>
          <img
            src={user?.photoURL}
            alt="User Icon"
            className="w-10 h-10 rounded-full object-cover border border-gray-400 transition-transform duration-300 hover:scale-110"
          />
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:-translate-y-1"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
