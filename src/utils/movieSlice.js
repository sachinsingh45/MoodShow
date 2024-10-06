import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        trendingMovies: null,
        upComingMovies: null,
        scifiMovies: null,
        horrorMovies: null,
        romanticMovies: null, 
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upComingMovies = action.payload;
        },
        addSciFiMovies: (state, action) => {
            state.scifiMovies = action.payload;
        },
        addHorrorMovies: (state, action) => {
            state.horrorMovies = action.payload;
        },
        addRomanticMovies: (state, action) => { 
            state.romanticMovies = action.payload; 
        },
    },
});

export const { 
    addNowPlayingMovies, 
    addPopularMovies, 
    addTrendingMovies, 
    addUpcomingMovies, 
    addSciFiMovies,
    addHorrorMovies,
    addRomanticMovies,
} = movieSlice.actions;

export default movieSlice.reducer;
