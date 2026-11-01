import React, { useState } from 'react'
import "./VideoTitle.css"
import { useNavigate } from 'react-router-dom'
import { IoPlay, IoInformationCircleOutline, IoStar } from "react-icons/io5";
import MovieInfoModal from '../MovieInfoModal/MovieInfoModal';

const VideoTitle = ({ movie }) => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const { id, title, overview, vote_average, release_date } = movie;
  const year = release_date?.slice(0, 4);

  return (
    <div className='video-title'>
      <span className='hero-badge'>Now Playing</span>
      <h2>{title}</h2>
      <div className='hero-meta'>
        {vote_average > 0 && <span className='hero-rating'><IoStar /> {vote_average.toFixed(1)}</span>}
        {year && <span>{year}</span>}
      </div>
      {overview && <p className='hero-overview'>{overview}</p>}
      <div className='hero-actions'>
        <button className='btn btn-light' onClick={() => navigate(`/watch/${id}`)}>
          <IoPlay /> Play
        </button>
        <button className='btn btn-glass' onClick={() => setShowInfo(true)}>
          <IoInformationCircleOutline /> More Info
        </button>
      </div>

      {showInfo && <MovieInfoModal movie={movie} onClose={() => setShowInfo(false)} />}
    </div>
  )
}

export default VideoTitle
