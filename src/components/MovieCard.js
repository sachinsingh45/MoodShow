import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <div className="relative m-2 w-28 md:w-40 group cursor-pointer transition-transform duration-300 transform hover:scale-101 overflow-hidden rounded-xl">
      {/* Poster Image */}
      <img
        alt={title}
        src={IMG_CDN_URL + posterPath}
        className="rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
      />

      {/* Glassy Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:bg-black/50 group-hover:backdrop-filter group-hover:backdrop-blur-sm">
        {/* Movie Title */}
        <p className="text-sm md:text-base font-bold text-yellow-400 mb-4 text-center">{title}</p>

        {/* Details Button */}
        <button className="bg-red-600 text-white font-bold py-1 px-4 rounded-full hover:bg-yellow-400 hover:text-red-600 transition-all duration-300">
          Details
        </button>
      </div>

      {/* Subtle Default Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-70 rounded-xl"></div>
    </div>
  );
};

export default MovieCard;
