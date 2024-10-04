import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addHorrorMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useHorrorMovies = () => {
    const dispatch = useDispatch();
    
    const fetchHorrorMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&without_genres=27', API_OPTIONS); // Genre ID for horror is 27
            const json = await response.json();
            dispatch(addHorrorMovies(json.results));
        } catch (error) {
            console.error("Error fetching horror movies:", error);
        }
    };

    useEffect(() => {
        fetchHorrorMovies();
    }, []);
};

export default useHorrorMovies;
