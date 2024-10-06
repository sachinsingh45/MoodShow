import React from 'react';
import useMovieVideos from '../hooks/useMovieVideos'; 

const VideoBackground = ({ movieID, children }) => {
  const trailerID = useMovieVideos(movieID);

  return (
    <div className="relative w-full h-[calc(100vh)] overflow-hidden">
      {/* Conditionally render the video iframe if trailerID exists */}
      {trailerID ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailerID}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerID}`} // Looping video and hiding controls
          title="YouTube video player"
          className=" absolute inset-0 w-full h-full object-cover scale-[calc(4)] sm:scale-150"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      ) : (
        <div className="absolute inset-0 bg-gray-800"></div>
      )}

      <div className="absolute inset-0">
        {/* Horizontal Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black sm:via-transparent to-transparent"></div>
        {/* Vertical Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black sm:via-transparent to-transparent"></div>
      </div>

      {/* Children components (title, overview, etc.) */}
      <div className="relative z-10">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { id: movieID }) // Pass movieID as id to children
        )}
      </div>
    </div>
  );
};

export default VideoBackground;
