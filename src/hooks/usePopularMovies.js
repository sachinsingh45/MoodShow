import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    const fetchPopularMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
        const json = await response.json();
        dispatch(addPopularMovies(json.results));
    }

    useEffect(() => {
        fetchPopularMovies();
    }, []);
};

export default usePopularMovies;
