import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import moviesReducer from "./movieSlice"

const appStore = configureStore(
    //Fetch Data from TMDB API and update store 
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer,
            // trailer:trailerReducer
        },
        devTools: true,
    }
)
export default appStore;