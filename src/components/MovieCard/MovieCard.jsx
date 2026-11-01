import React from 'react'
import "./MovieCard.css"
import { MOVIE_IMG_CDN } from "../../utils/constants"
import { useNavigate } from 'react-router-dom';
import { IoPlay, IoStar } from "react-icons/io5";

const MovieCard = ({ movie }) => {

  const navigate = useNavigate();
  const { id, title, poster_path, vote_average, release_date } = movie;

  return (
    <button className='movie-card' onClick={() => navigate(`/watch/${id}`)} aria-label={`Watch ${title} trailer`}>
      <img src={MOVIE_IMG_CDN + poster_path} className='movie-card-img' alt={title} loading='lazy' />
      <div className='movie-card-overlay'>
        <span className='movie-card-play'><IoPlay /></span>
        <p className='movie-card-title'>{title}</p>
        <div className='movie-card-meta'>
          {vote_average > 0 && <span className='movie-card-rating'><IoStar /> {vote_average.toFixed(1)}</span>}
          {release_date && <span>{release_date.slice(0, 4)}</span>}
        </div>
      </div>
    </button>
  )
}

export default MovieCard
