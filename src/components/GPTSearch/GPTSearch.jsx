import React, { useRef, useState } from 'react'
import "./GPTSearch.css"
import { getAIClient, AI_MODEL } from "../../utils/ai";
import { API_OPTIONS } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addGPTMovies, setShimmerUI } from '../../redux/gptSlice';
import { IoSearch, IoSparkles, IoAlertCircle } from "react-icons/io5";

const SUGGESTIONS = [
  "Feel-good comedies for a rainy day",
  "Mind-bending sci-fi like Inception",
  "Best Telugu action movies",
  "Underrated thrillers from the 2010s",
];

const GPTSearch = () => {

  const dispatch = useDispatch();
  const searchText = useRef(null);
  const loading = useSelector(store => store.gpt.shimmerUI);
  const [error, setError] = useState(null);

  const handleGPTMovies = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
    const json = await data.json();
    return json.results || [];
  }

  const handleGPTSearch = async (e) => {
    e?.preventDefault();
    const query = searchText.current.value.trim();

    if (!query) {
      setError("Tell us what you're in the mood for, e.g. \"slow-burn crime dramas\".");
      searchText.current.focus();
      return;
    }

    const aiClient = getAIClient();
    if (!aiClient) {
      setError("GPT search needs an OpenRouter API key. Add REACT_APP_OPENROUTER_KEY to your .env file and restart the app.");
      return;
    }

    setError(null);
    dispatch(addGPTMovies(null));
    dispatch(setShimmerUI(true));

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      query +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const gptResults = await aiClient.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: AI_MODEL,
      });

      // reasoning models can include their thinking inline, keep only the
      // comma separated answer line
      const lines = (gptResults?.choices?.[0]?.message?.content || "")
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const content = lines.filter((line) => line.includes(",")).pop() || lines.pop() || "";
      const resultsArray = content
        .split(",")
        .map((movie) => movie.replace(/^[\s\d.\-*"]+|["\s.]+$/g, ""))
        .filter(Boolean);

      if (!resultsArray.length) throw new Error("No movies returned");

      const promisifiedResults = await Promise.all(resultsArray.map((movie) => handleGPTMovies(movie)));
      dispatch(addGPTMovies({ movieNames: resultsArray, moviesInfo: promisifiedResults }));
    } catch (err) {
      setError(err?.status === 401
        ? "Your OpenRouter API key was rejected. Check REACT_APP_OPENROUTER_KEY in your .env file."
        : err?.status === 429
          ? "The free AI model is busy right now. Please try again in a minute."
          : "We couldn't get recommendations right now. Please try again in a moment.");
    } finally {
      dispatch(setShimmerUI(false));
    }
  }

  const handleSuggestion = (suggestion) => {
    searchText.current.value = suggestion;
    handleGPTSearch();
  }

  return (
    <div className='gpt-search'>
      <span className='gpt-eyebrow'><IoSparkles /> AI-powered recommendations</span>
      <h1>What do you feel like watching?</h1>
      <p className='gpt-subtitle'>Describe a mood, a genre or a movie you loved. GPT will find your next pick.</p>

      <form className='gpt-search-bar' onSubmit={handleGPTSearch}>
        <IoSearch className='gpt-search-icon' />
        <input
          ref={searchText}
          type='text'
          placeholder='e.g. "heist movies with a twist ending"'
          aria-label='Describe the movies you want'
          onChange={() => error && setError(null)}
        />
        <button type='submit' className='btn btn-accent' disabled={loading}>
          {loading ? <span className='spinner'></span> : "Search"}
        </button>
      </form>

      {error && <p className='gpt-error' role='alert'><IoAlertCircle /> <span>{error}</span></p>}

      <div className='gpt-suggestions'>
        {SUGGESTIONS.map((suggestion) => (
          <button key={suggestion} type='button' className='gpt-chip' onClick={() => handleSuggestion(suggestion)} disabled={loading}>
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GPTSearch
