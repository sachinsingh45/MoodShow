import React from "react";
import useMovieDetails from "../hooks/useMovieDetails";
import { IMG_CDN_URL } from "../utils/constants";
import { FaStar, FaFilm, FaGlobe, FaClock, FaMoneyBill, FaImdb } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import Shimmer from "./Shimmer";

const MovieDetail = () => {
  const movieID = useParams().id;
  const { movieDetails, trailerID } = useMovieDetails(movieID);

  
  if (!movieDetails) return <Shimmer />;

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 lg:p-6">
      {/* Trailer and Title/Overview Section */}
      <div className="flex flex-col pt-12  lg:flex-row items-start w-full max-w-6xl mb-12">
        
        {/* Movie Trailer */}
        <div className="w-full lg:w-2/3 h-auto lg:h-auto relative mb-8 lg:mb-0">
          {trailerID ? (
            <div className="relative pb-[56.25%] h-0"> {/* Aspect ratio 16:9 */}
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailerID}?autoplay=1&controls=1&mute=0`}
                title="Movie Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img
              src={IMG_CDN_URL + movieDetails.poster_path}
              alt={movieDetails.title}
              className="w-36 h-auto object-cover rounded-lg"
            />
          )}
        </div>

        {/* Title and Overview Section */}
        <div className="w-full lg:w-1/3 lg:ml-8 flex flex-col justify-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-yellow-400 mb-4">{movieDetails.title}</h1>
          <p className="text-sm md:text-lg text-gray-300 mb-6">{movieDetails.overview}</p>
          <p className="italic font-bold text-red-600 mb-4">{movieDetails.tagline}</p>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Genre Tags */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
          <FaFilm className="text-yellow-400 text-4xl mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Genres</h3>
          <div className="flex flex-wrap justify-center">
            {movieDetails.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold mx-1 mb-2"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
          <FaGlobe className="text-yellow-400 text-4xl mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Languages</h3>
          <div className="flex flex-wrap justify-center">
            {movieDetails.spoken_languages.map((lang) => (
              <span
                key={lang.iso_639_1}
                className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold mx-1 mb-2"
              >
                {lang.english_name}
              </span>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
          <FaStar className="text-yellow-400 text-4xl mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Rating</h3>
          <p className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center justify-center">
            <FaStar className="mr-1 text-yellow-300" />
            {movieDetails.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-sm mt-2">{movieDetails.vote_count} Votes</p>
        </div>

        {/* Budget */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
          <FaMoneyBill className="text-yellow-400 text-4xl mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Budget</h3>
          <p className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
            ${movieDetails.budget.toLocaleString()}
          </p>
        </div>

        {/* Runtime */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
          <FaClock className="text-yellow-400 text-4xl mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Runtime</h3>
          <p className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
            {movieDetails.runtime} Minutes
          </p>
        </div>

        {/* IMDb Link */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center text-center">
          <FaImdb className="text-yellow-400 text-4xl mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">IMDb</h3>
          <a
            href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white hover:text-black px-4 py-1 rounded-full font-bold hover:bg-yellow-500 transition duration-300"
          >
            <div className="flex">
                View on IMDb
                <FaExternalLinkAlt className="ml-2" />
            </div>
          </a>
        </div>
      </div>

      {/* Belongs to Collection */}
      {movieDetails.belongs_to_collection && (
        <div className="w-full max-w-6xl p-6 mt-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Part of the {movieDetails.belongs_to_collection.name}
          </h2>
          <img
            src={IMG_CDN_URL + movieDetails.belongs_to_collection.poster_path}
            alt={movieDetails.belongs_to_collection.name}
            className="w-32 h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
