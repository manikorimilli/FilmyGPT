// Picks the best YouTube video from TMDB's /videos results:
// an official trailer first, then any trailer, then any YouTube video.
export const pickTrailer = (videos) => {
  const youtube = (videos || []).filter((video) => video.site === "YouTube");
  return (
    youtube.find((video) => video.type === "Trailer" && video.official) ||
    youtube.find((video) => video.type === "Trailer") ||
    youtube[0] ||
    null
  );
};
