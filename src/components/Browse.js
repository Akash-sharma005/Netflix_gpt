import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
// Header
const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    return (
        <div>
            <Header />
            <MainContainer />
            <SecondaryContainer />
            {
                // Main Container
                //   Video background
                //.  Video title

                // Secondary Container
                //Movie List * n
                //cards * n
            }
        </div>
    )
}

export default Browse
