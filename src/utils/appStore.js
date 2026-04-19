import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice"
import configReducer from "./configSlice"

const appStore = configureStore(
    //Fetch Data from TMDB API and update store 
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer,
            gpt:gptReducer,
            config:configReducer
        },
        devTools: true,
    }
)
export default appStore;