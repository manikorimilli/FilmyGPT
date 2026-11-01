import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addMovieTrailer } from '../redux/moviesSlice';
import { pickTrailer } from '../utils/trailer';

const useMovieTrailer = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) return;

        const getMovieTrailerData = async () => {
            try {
                const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, API_OPTIONS);
                const json = await data.json();
                dispatch(addMovieTrailer(pickTrailer(json.results)));
            } catch (error) {
                dispatch(addMovieTrailer(null));
            }
        }
        getMovieTrailerData();
    }, [id, dispatch]);
}

export default useMovieTrailer
