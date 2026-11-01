import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWatchMovieDetails, addWatchPlayerVideo, removeWatchPlayerVideo } from '../redux/moviesSlice';
import { API_OPTIONS } from "../utils/constants"
import { pickTrailer } from '../utils/trailer';

// Loads the trailer and details for the movie in the URL.
// Returns nothing; components read the results from the store.
const useWatchPlayerVideo = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {
        let cancelled = false;
        // clear the previous movie so its trailer never flashes on the next one
        dispatch(removeWatchPlayerVideo());

        const getWatchPlayerData = async () => {
            try {
                const [videosRes, detailsRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, API_OPTIONS),
                    fetch(`https://api.themoviedb.org/3/movie/${id}`, API_OPTIONS),
                ]);
                const [videos, details] = await Promise.all([videosRes.json(), detailsRes.json()]);
                if (cancelled) return;
                // false (not null) marks "loaded, but no trailer"
                dispatch(addWatchPlayerVideo(pickTrailer(videos.results) || false));
                dispatch(addWatchMovieDetails(details?.id ? details : false));
            } catch (error) {
                if (cancelled) return;
                dispatch(addWatchPlayerVideo(false));
                dispatch(addWatchMovieDetails(false));
            }
        }
        getWatchPlayerData();

        return () => {
            cancelled = true;
        };
    }, [id, dispatch]);
}

export default useWatchPlayerVideo;
