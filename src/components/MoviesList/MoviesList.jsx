import React, { useCallback, useEffect, useRef, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import "./MoviesList.css"
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const MoviesList = ({ title, movies, emptyText }) => {

  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const visibleMovies = movies?.filter((movie) => movie.poster_path);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll({
      left: track.scrollLeft > 4,
      right: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, movies]);

  const scrollBy = (direction) => {
    const track = trackRef.current;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section className='movie-list'>
      {title && <h2 className='movie-list-title'>{title}</h2>}

      {!movies ? (
        <div className='movie-card-section'>
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className='movie-card skeleton-card'></div>)}
        </div>
      ) : visibleMovies.length === 0 ? (
        <p className='movie-list-empty'>{emptyText || "Nothing to show here right now."}</p>
      ) : (
        <div className='movie-list-rail'>
          {canScroll.left && (
            <button className='rail-arrow is-left' onClick={() => scrollBy(-1)} aria-label={`Scroll ${title} left`}>
              <IoChevronBack />
            </button>
          )}
          <div className='movie-card-section' ref={trackRef} onScroll={updateArrows}>
            {visibleMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
          {canScroll.right && (
            <button className='rail-arrow is-right' onClick={() => scrollBy(1)} aria-label={`Scroll ${title} right`}>
              <IoChevronForward />
            </button>
          )}
        </div>
      )}
    </section>
  )
}

export default MoviesList
