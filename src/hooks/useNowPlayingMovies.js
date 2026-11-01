import { useEffect } from 'react'
import { API_OPTIONS } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../redux/moviesSlice';

const useNowPlayingMovies = () => {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies.nowPlayingMovies);

  useEffect(() => {
    // already loaded, e.g. when coming back from GPT search or the watch page
    if (movies) return;

    const getMoviesData = async () => {
      try {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json?.results || []));
      } catch (error) {
        dispatch(addNowPlayingMovies([]));
      }
    }
    getMoviesData();
  }, [movies, dispatch]);
}

export default useNowPlayingMovies;
