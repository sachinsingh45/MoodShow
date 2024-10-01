import React from 'react';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        navigate('/error');
      });
  };

  return (
    <div className="bg-gradient-to-b from-black/80 to-transparent absolute w-full top-0 flex items-center justify-between px-10 py-4 shadow-lg z-50">
      {/* Logo Section */}
      <img
        src="logo.png"
        alt="logo"
        className="w-40 h-auto p-2 rounded-lg object-contain transition-transform duration-300 hover:scale-105"
      />

      {/* User Profile & Sign Out Section */}
      
      {user && (
        <div className="flex items-center space-x-4 p-2">
        {/* http://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png */}
        <img
          src= {user?.photoURL}
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
