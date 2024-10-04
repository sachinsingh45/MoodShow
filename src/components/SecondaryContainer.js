import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
      <div className="bg-black pt-40">
        <div className="  md:-mt-72 md:pl-8 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Trending"} movies={movies.trendingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies}/>
          <MovieList title={"Romantic Movies"} movies={movies.romanticMovies} />
          <MovieList title={"Sci-Fi Movies"} movies={movies.scifiMovies} />
          <MovieList title={"Horror Movies"} movies={movies.horrorMovies} />
        </div>
      </div>
  );
};
export default SecondaryContainer;