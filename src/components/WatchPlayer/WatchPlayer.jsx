import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoStar, IoTimeOutline, IoCalendarClearOutline, IoFilmOutline } from "react-icons/io5";
import Header from '../Header/Header';
import useWatchPlayerVideo from '../../hooks/useWatchPlayerVideo';
import { MOVIE_BACKDROP_MEDIUM_CDN, MOVIE_IMG_CDN } from '../../utils/constants';
import "./WatchPlayer.css"

const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

const WatchPlayer = () => {
  const { movieId } = useParams();
  useWatchPlayerVideo(movieId);

  const watchData = useSelector(store => store.movies.watchPlayerVideo);
  const details = useSelector(store => store.movies.watchMovieDetails);

  const loading = watchData === null;
  const year = details?.release_date?.slice(0, 4);
  const runtime = formatRuntime(details?.runtime);

  return (
    <div className='watch-page'>
      {details?.backdrop_path && (
        <div className='watch-ambient' style={{ backgroundImage: `url(${MOVIE_BACKDROP_MEDIUM_CDN + details.backdrop_path})` }} aria-hidden='true'></div>
      )}
      <Header showBack />

      <main className='watch-content'>
        <div className='watch-player-frame'>
          {loading ? (
            <div className='watch-player-placeholder'><div className='spinner'></div></div>
          ) : watchData ? (
            <iframe
              className="watch-player"
              src={`https://www.youtube.com/embed/${watchData.key}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={details?.title ? `${details.title} trailer` : "Movie trailer"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <div className='watch-player-placeholder is-empty'>
              {details?.backdrop_path && <img src={MOVIE_BACKDROP_MEDIUM_CDN + details.backdrop_path} alt='' />}
              <div className='watch-empty-message'>
                <IoFilmOutline />
                <p>Trailer not available for this movie yet.</p>
              </div>
            </div>
          )}
        </div>

        {details && (
          <section className='watch-details'>
            {details.poster_path && (
              <img className='watch-poster' src={MOVIE_IMG_CDN + details.poster_path} alt={details.title} />
            )}
            <div className='watch-info'>
              <h1>{details.title}</h1>
              {details.tagline && <p className='watch-tagline'>{details.tagline}</p>}

              <div className='watch-meta'>
                {details.vote_average > 0 && <span className='watch-rating'><IoStar /> {details.vote_average.toFixed(1)}</span>}
                {year && <span><IoCalendarClearOutline /> {year}</span>}
                {runtime && <span><IoTimeOutline /> {runtime}</span>}
              </div>

              {details.genres?.length > 0 && (
                <div className='watch-genres'>
                  {details.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}
                </div>
              )}

              {details.overview && <p className='watch-overview'>{details.overview}</p>}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default WatchPlayer
