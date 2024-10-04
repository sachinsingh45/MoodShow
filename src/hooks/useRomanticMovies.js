import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addRomanticMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useRomanticMovies = () => {
    const dispatch = useDispatch();
    
    const fetchRomanticMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=10749&language=en-US&page=1', API_OPTIONS); // Genre ID for romance is 10749
            const json = await response.json();
            dispatch(addRomanticMovies(json.results));
        } catch (error) {
            console.error("Error fetching romantic movies:", error);
        }
    };

    useEffect(() => {
        fetchRomanticMovies();
    }, []);
};

export default useRomanticMovies;
