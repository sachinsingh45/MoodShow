import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useMovieVideos = (movieID) => {
    const [trailerID, setTrailerID] = useState(null);

    const getMovieVideos = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, API_OPTIONS);
            const json = await response.json();

            if (json && Array.isArray(json.results) && json.results.length > 0) {
                const filterData = json.results.filter((video) => video.type === 'Trailer');
                const trailer = filterData.length === 0 ? json.results[0] : filterData[0];
                setTrailerID(trailer.key);
            } else {
                console.error('No trailers found or no results for this movie.');
            }
        } catch (error) {
            console.error('Error fetching the movie trailer:', error);
        }
    };

    useEffect(() => {
        if (movieID) {
            getMovieVideos();
        }
    }, [movieID]);

    return trailerID;
};

export default useMovieVideos;
