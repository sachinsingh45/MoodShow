import { configureStore } from "@reduxjs/toolkit";
import  useReducer from "./userSlice";
import movieSlice from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
const appStore = configureStore(
    {
        reducer:{
            user: useReducer,
            movies: movieSlice,
            gpt: gptReducer,
            config: configReducer,
        },
    }
);
export default appStore;