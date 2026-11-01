import { useEffect } from 'react'
import { API_OPTIONS } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addPopularMovies } from '../redux/moviesSlice';

const usePopularMovies = () => {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies.popularMovies);

  useEffect(() => {
    // already loaded, e.g. when coming back from GPT search or the watch page
    if (movies) return;

    const getMoviesData = async () => {
      try {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addPopularMovies(json?.results || []));
      } catch (error) {
        dispatch(addPopularMovies([]));
      }
    }
    getMoviesData();
  }, [movies, dispatch]);
}

export default usePopularMovies;
