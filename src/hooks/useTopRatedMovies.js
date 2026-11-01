import { useEffect } from 'react'
import { API_OPTIONS } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addTopRatedMovies } from '../redux/moviesSlice';

const useTopRatedMovies = () => {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies.topRatedMovies);

  useEffect(() => {
    // already loaded, e.g. when coming back from GPT search or the watch page
    if (movies) return;

    const getMoviesData = async () => {
      try {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addTopRatedMovies(json?.results || []));
      } catch (error) {
        dispatch(addTopRatedMovies([]));
      }
    }
    getMoviesData();
  }, [movies, dispatch]);
}

export default useTopRatedMovies;
