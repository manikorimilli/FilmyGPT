import React from 'react'
import "./SecondaryBrowse.css"
import MoviesList from '../MoviesList/MoviesList'
import { useSelector } from 'react-redux'

const SecondaryBrowse = () => {

  const movies = useSelector(store => store.movies);
  return (
    <div className='secondary-browse'>
      <MoviesList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MoviesList title={"Top Rated"} movies={movies.topRatedMovies} />
      <MoviesList title={"Upcoming"} movies={movies.upComingMovies} />
      <MoviesList title={"Popular"} movies={movies.popularMovies} />

      <footer className='browse-footer'>
        <p>FilmyGPT</p>
        <p>Movie data and images from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </div>
  )
}

export default SecondaryBrowse
