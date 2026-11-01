import React, { useEffect } from 'react'
import "./MovieInfoModal.css"
import { useNavigate } from 'react-router-dom'
import { IoClose, IoPlay, IoStar } from "react-icons/io5";
import { MOVIE_BACKDROP_MEDIUM_CDN } from '../../utils/constants';

const MovieInfoModal = ({ movie, onClose }) => {
  const navigate = useNavigate();
  const { id, title, overview, vote_average, vote_count, release_date, backdrop_path, original_language } = movie;

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-card' role='dialog' aria-modal='true' aria-label={title} onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label='Close'><IoClose /></button>

        <div className='modal-hero'>
          {backdrop_path && <img src={MOVIE_BACKDROP_MEDIUM_CDN + backdrop_path} alt='' />}
          <div className='modal-hero-content'>
            <h3>{title}</h3>
            <button className='btn btn-light' onClick={() => navigate(`/watch/${id}`)}>
              <IoPlay /> Play trailer
            </button>
          </div>
        </div>

        <div className='modal-body'>
          <div className='modal-meta'>
            {vote_average > 0 && (
              <span className='modal-rating'><IoStar /> {vote_average.toFixed(1)} <small>({vote_count?.toLocaleString()} votes)</small></span>
            )}
            {release_date && <span>{new Date(release_date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>}
            {original_language && <span className='modal-tag'>{original_language.toUpperCase()}</span>}
          </div>
          <p>{overview || "No description available yet."}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieInfoModal
