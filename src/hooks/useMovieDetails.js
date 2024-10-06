import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import useMovieVideos from './useMovieVideos';

const useMovieDetails = (movieID) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [trailerID, setTrailerID] = useState(null);

    const getMovieDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, API_OPTIONS);
            const json = await response.json();
            console.log('Movie Details Response:', json); // Debugging line
            setMovieDetails(json);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        } 
    };

    const trailerKey = useMovieVideos(movieID); // Move this outside useEffect
    useEffect(() => {
        if (movieID) {
            getMovieDetails();
            setTrailerID(trailerKey);
        }
    }, [movieID, trailerKey]);

    return { movieDetails, trailerID };
};

export default useMovieDetails;
