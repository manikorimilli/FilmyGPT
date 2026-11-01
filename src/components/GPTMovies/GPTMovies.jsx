import React from 'react'
import "./GPTMovies.css"
import { useSelector } from 'react-redux';
import MoviesList from '../MoviesList/MoviesList';


const GPTMovies = () => {
  const movies = useSelector(store => store.gpt.gptRecommendedMovies);
  const shimmerUIVal = useSelector(store => store.gpt.shimmerUI);

  const movieNames = movies?.movieNames;
  const moviesInfo = movies?.moviesInfo;

  if (shimmerUIVal) {
    return (
      <div className='gpt-movies'>
        <p className='gpt-loading-text'>The show will begin shortly... 🍿</p>
        <MoviesList title={""} movies={null} />
      </div>
    );
  }

  if (!movieNames) return null;

  return (
    <div className='gpt-movies'>
      <h2 className='gpt-results-heading'>Picked for you</h2>
      {movieNames.map((movieName, index) => (
        <MoviesList
          key={movieName + index}
          title={movieName}
          movies={moviesInfo[index]}
          emptyText={`We couldn't find "${movieName}" on TMDB.`}
        />
      ))}
    </div>
  )
}

export default GPTMovies
