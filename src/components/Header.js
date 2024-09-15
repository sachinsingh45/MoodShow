import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-b from-black to-transparent absolute w-full top-0 flex items-center justify-between px-10 py-4 shadow-lg">
      <img
        src="logo.png"
        alt="logo"
        className="w-40 h-auto p-2 rounded-lg object-contain"
      />
    </div>
  );
};

export default Header;
