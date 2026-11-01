import React from 'react'
import "./GPTSearchPlayground.css"
import GPTSearch from '../GPTSearch/GPTSearch'
import GPTMovies from '../GPTMovies/GPTMovies'


const GPTSearchPlayground = () => {
  return (
    <div className='gpt-search-ground'>
      <div className='gpt-search-bg' aria-hidden='true'></div>
      <div className='gpt-search-content'>
        <GPTSearch />
        <GPTMovies />
      </div>
    </div>
  )
}

export default GPTSearchPlayground
