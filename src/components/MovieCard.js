import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";
import { FaStar } from 'react-icons/fa'; 

const MovieCard = ({ posterPath, title, language, rating, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate

  if (!posterPath) return null;

  const handleCardButton = () => {
    navigate(`/browse/watch/${id}`); // Navigate to movie detail page with the movie ID
  };

  return (
    <div className="relative m-2 w-28 md:w-40 lg:w-48 group cursor-pointer transition-transform duration-300 transform hover:scale-105 overflow-hidden rounded-xl min-w-[7rem] min-h-[10rem]">
      {/* Glassy Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:bg-black/50 group-hover:backdrop-filter group-hover:backdrop-blur-sm z-10">
        {/* Movie Title */}
        <p className="text-sm md:text-base font-bold text-yellow-400 mb-2 text-center">{title}</p>

        {/* Details Button */}
        <button
          className="bg-red-600 text-white font-bold py-1 px-4 rounded-full hover:bg-yellow-400 hover:text-red-600 transition-all duration-300 hover:shadow-lg transform hover:scale-110 z-50"
          onClick={handleCardButton}
        >
          Details
        </button>
      </div>

      {/* Top-left Language and Rating Badge */}
      <div className="absolute top-2 left-2 flex items-center space-x-1 z-20">
        <div className="bg-yellow-500 text-black text-xs md:text-sm font-bold px-1 py-0.5 rounded-full shadow-md">
          {language.toUpperCase()}
        </div>
        <div className="bg-red-600 text-white text-xs md:text-sm font-bold px-1 py-0.5 rounded-full shadow-md flex items-center">
          <FaStar className="mr-1 text-yellow-300" />
          {rating.toFixed(1)} / 10
        </div>
      </div>

      {/* Poster Image */}
      <img
        alt={title}
        src={IMG_CDN_URL + posterPath}
        className="rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300 pointer-events-none object-cover h-full w-full"
      />

      {/* Subtle Default Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-70 rounded-xl pointer-events-none"></div>
    </div>
  );
};

export default MovieCard;
