import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainComponent = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null;
  
  const randomIndex = Math.floor(Math.random() * Math.min(movies.length, 20));
  const mainMovie = movies[randomIndex];
  const { id, original_title, overview } = mainMovie;

  return (
    <div>
      <VideoBackground movieID={id}>
        <VideoTitle title={original_title} overview={overview} id={id} />
      </VideoBackground>
    </div>
  );
};

export default MainComponent;
