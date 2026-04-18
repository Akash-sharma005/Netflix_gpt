import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideos } from '../utils/movieSlice'
// useEffect

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies?.trailerVideo);

    //fetch trailer video && updating the store with trailer videos
    const getMoviesVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" +
            movieId + "/videos?language=en-US", API_OPTIONS);
        const json = await data.json();
        const filterData = json.results.filter((video) => video.type == "Trailer")
        const trailer = filterData.length ? filterData[0] : json.results[0]
        dispatch(addTrailerVideos(trailer))

    };
    useEffect(() => {
        getMoviesVideos();
    }, [])


}

export default useMovieTrailer
