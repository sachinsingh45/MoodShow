import React from 'react';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice.js";
const Header = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate('/error');
      });
  };
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth,(user) =>{
        if(user){
            const {uid,email, displayName,photoURL} = user;
            dispatch(addUser({uid: uid, email: email,displayName: displayName, photoURL: photoURL }));
            navigate("/browse");
        }
        else{
            dispatch(removeUser());
            navigate("/");
        }
    });
    return () => unsubscribe();
  },[])
  return (
    <div className="bg-gradient-to-b from-black absolute w-full top-0 flex items-center justify-between px-10 py-4  z-50">
      <img
        src= "logo.png"
        alt="logo"
        className="w-40 h-auto p-2 rounded-lg object-contain transition-transform duration-300 hover:scale-105"
      />
      {user && (
        <div className="flex items-center space-x-4 p-2">
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
