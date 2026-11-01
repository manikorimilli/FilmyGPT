import { useEffect } from 'react'
import { API_OPTIONS } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addUpComingMovies } from '../redux/moviesSlice';

const useUpComingMovies = () => {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies.upComingMovies);

  useEffect(() => {
    // already loaded, e.g. when coming back from GPT search or the watch page
    if (movies) return;

    const getMoviesData = async () => {
      try {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addUpComingMovies(json?.results || []));
      } catch (error) {
        dispatch(addUpComingMovies([]));
      }
    }
    getMoviesData();
  }, [movies, dispatch]);
}

export default useUpComingMovies;
