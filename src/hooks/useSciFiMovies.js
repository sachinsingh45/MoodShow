import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addSciFiMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useSciFiMovies = () => {
    const dispatch = useDispatch();

    const fetchSciFiMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&without_genres=878', API_OPTIONS);
        const json = await response.json();
        dispatch(addSciFiMovies(json.results));
    }

    useEffect(() => {
        fetchSciFiMovies();
    }, []);
};

export default useSciFiMovies;
