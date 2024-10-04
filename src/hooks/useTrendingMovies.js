import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTrendingMovies = () => {
    const dispatch = useDispatch();

    const fetchTrendingMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', API_OPTIONS);
        const json = await response.json();
        dispatch(addTrendingMovies(json.results));
    }

    useEffect(() => {
        fetchTrendingMovies();
    }, []);
};

export default useTrendingMovies;
