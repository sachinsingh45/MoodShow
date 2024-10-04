import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    const fetchUpcomingMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
        const json = await response.json();
        dispatch(addUpcomingMovies(json.results));
    }

    useEffect(() => {
        fetchUpcomingMovies();
    }, []);
};

export default useUpcomingMovies;
