import { configureStore } from "@reduxjs/toolkit";
import  useReducer from "./userSlice";
import movieSlice from "./movieSlice";
const appStore = configureStore(
    {
        reducer:{
            user: useReducer,
            movies: movieSlice,
        },
    }
);
export default appStore;