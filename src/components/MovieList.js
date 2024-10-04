import MovieCard from "./MovieCard";
import './../../src/styles.css';
const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-thin">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard 
              key={movie.id} 
              posterPath={movie.poster_path} 
              title={movie.title} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
