import React, { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const VideoBackground = ({ movieID, children }) => {
  const [trailerID, setTrailerID] = useState(null);

  const getMovieVideos = async () => {
    try {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, API_OPTIONS);
      const json = await data.json();

      if (json && Array.isArray(json.results) && json.results.length > 0) {
        const filterData = json.results.filter((video) => video.type === 'Trailer');
        const trailer = filterData.length === 0 ? json.results[0] : filterData[0];
        setTrailerID(trailer.key);
      } else {
        console.error('No trailers found or no results for this movie.');
      }
    } catch (error) {
      console.error('Error fetching the movie trailer:', error);
    }
  };

  useEffect(() => {
    if (movieID) {
      getMovieVideos();
    }
  }, [movieID]);

  return (
    <div className="relative w-full h-[calc(100vh-2rem)] overflow-hidden">
      {/* Conditionally render the video iframe if trailerID exists */}
      {trailerID ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailerID}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerID}`} // Looping video and hiding controls
          title="YouTube video player"
          className="absolute inset-0 w-full h-full object-cover scale-150"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      ) : (
        <div className="absolute inset-0 bg-gray-800"></div> // Fallback background if no trailer is found
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black"></div>

      {/* Children components (title, overview, etc.) */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
