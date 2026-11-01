import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    toogleGPTSearch: false,
    gptRecommendedMovies: null,
    shimmerUI: false,
  },
  reducers: {
    toogleGPT: (state, action) => {
      state.toogleGPTSearch = !state.toogleGPTSearch;
    },
    closeGPT: (state, action) => {
      state.toogleGPTSearch = false;
    },
    addGPTMovies: (state, action) => {
      state.gptRecommendedMovies = action.payload;
    },
    setShimmerUI: (state, action) => {
      state.shimmerUI = action.payload;
    },
  },
});

export const { toogleGPT, closeGPT, addGPTMovies, setShimmerUI } = gptSlice.actions;
export default gptSlice.reducer;
