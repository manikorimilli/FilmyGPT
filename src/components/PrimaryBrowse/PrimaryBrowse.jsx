import React from 'react'
import "./PrimaryBrowse.css"
import VideoTitle from '../VideoTitle/VideoTitle'
import VideoBackground from '../VideoBackground/VideoBackground'
import { useSelector } from 'react-redux'

const PrimaryBrowse = () => {

  const movieData = useSelector(store => store.movies.nowPlayingMovies);

  //skeleton for Initial rendering
  if (!movieData) return <div className='primary-browse hero-skeleton'></div>;
  if (!movieData.length) return <div className='primary-browse hero-empty'></div>;

  const movie = movieData[0];

  return (
    <div className='primary-browse'>
      <VideoBackground id={movie.id} backdrop={movie.backdrop_path} />
      <VideoTitle movie={movie} />
    </div>
  )
}

export default PrimaryBrowse
