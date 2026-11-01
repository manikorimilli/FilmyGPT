import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    movieTrailer: null,
    watchPlayerVideo: null,
    watchMovieDetails: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addWatchPlayerVideo: (state, action) => {
      state.watchPlayerVideo = action.payload;
    },
    addWatchMovieDetails: (state, action) => {
      state.watchMovieDetails = action.payload;
    },
    removeWatchPlayerVideo: (state, action) => {
      state.watchPlayerVideo = null;
      state.watchMovieDetails = null;
    },
  },
});
export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
  addMovieTrailer,
  addWatchPlayerVideo,
  addWatchMovieDetails,
  removeWatchPlayerVideo,
} = moviesSlice.actions;

export default moviesSlice.reducer;
