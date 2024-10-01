import React from 'react';
import Header from './Header';  // Import the Header component

const Browse = () => {
  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('bg.jpg')" }}>
      {/* Header */}
      <Header />

      {/* Browse Content */}
      <div className="absolute inset-0 flex items-center justify-center text-white ">
        <h1 className="text-5xl font-bold backdrop-blur-md bg-black bg-opacity-50 p-4">Browse Movies and Shows</h1>
      </div>
    </div>
  );
}

export default Browse;
