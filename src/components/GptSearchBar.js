import React, { useRef, useState } from "react"; // Fix useRef and useState errors
import { useDispatch, useSelector } from "react-redux"; // Fix useDispatch and useSelector errors
import axios from "axios"; // Fix axios error
import lang from "../utils/languageConstants"; // Fix lang error
import { API_OPTIONS } from "../utils/constants"; // Fix API_OPTIONS error
import { addGPTMovieResult } from "../utils/gptSlice"; // Fix addGPTMovieResult error

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const user = useSelector((store) => store.user);  // Fetch the entire user object
  const userName = user ? user.displayName : null;  // Safely access displayName if user exists
  const searchText = useRef(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [loading, setLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.error("Error fetching movie data from TMDB:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current.value.trim();
    if (!userQuery) {
      console.error("Search query cannot be empty.");
      return;
    }

    setLoading(true);

    const cohereQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${userQuery}. Give me just names without anything. I have provided the format ahead how you have to respond, Only give me names of 10 movies, comma-separated. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya, KGF, Bahubali, Ramayan, Baghii, Stree`;

    try {
      const cohereResponse = await axios.post(
        "https://api.cohere.ai/generate",
        {
          model: "command-r-plus",
          prompt: cohereQuery,
          max_tokens: 50,
          temperature: 0.9,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (cohereResponse.data && cohereResponse.data.text) {
        const gptMovies = cohereResponse.data.text
          .split(",")
          .map(movie => movie.trim());

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);

        dispatch(
          addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
        );
      } else {
        console.error("Unexpected response structure:", cohereResponse.data);
      }
    } catch (error) {
      console.error("Error fetching movie data from Cohere:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] sm:pb-0 pb-80 flex justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-gradient-to-br from-gray-800/70 to-gray-900 border-2 border-yellow-400 rounded-lg shadow-2xl p-8 space-y-6 transition duration-300 hover:shadow-yellow-500/30">
        {userName ? ( 
          <>
            <h1 className="text-white text-l sm:text-2xl md:text-3xl font-bold mb-4 text-center">
              {lang[langKey].greeting}! 👋 {userName} ✨
            </h1>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                ref={searchText}
                type="text"
                className="w-full p-4 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-700 transition duration-300 shadow-md hover:shadow-lg"
                placeholder={lang[langKey].gptSearchPlaceholder}
              />
              <button
                className="w-full px-4 md:text-lg text-sm md:px-1 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-red-600 hover:to-yellow-600 transition duration-300 transform hover:scale-105 active:scale-95 flex justify-center items-center"
                onClick={handleGptSearchClick}
              >
                <i className="fas fa-robot mr-2"></i>
                {loading ? lang[langKey].onSearching : lang[langKey].search}
              </button>
            </form>
          </>
        ) : (
          <h1 className="text-white text-l sm:text-2xl md:text-3xl font-bold mb-4 text-center">
            Please log in to use the search functionality.
          </h1>
        )}
      </div>
    </div>
  );
};

export default GptSearchBar;
