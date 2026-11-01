import React, { useState } from 'react';
import "./VideoBackground.css";
import useMovieTrailer from '../../hooks/useMovieTrailer';
import { useSelector } from "react-redux";
import { MOVIE_BACKDROP_CDN } from '../../utils/constants';

const VideoBackground = ({ id, backdrop }) => {
    useMovieTrailer(id);

    const trailerVideo = useSelector((store) => store.movies.movieTrailer);
    const [videoReady, setVideoReady] = useState(false);

    return (
        <div className="video-background-container" aria-hidden="true">
            {backdrop && (
                <img
                    className={`hero-backdrop ${videoReady ? "is-hidden" : ""}`}
                    src={MOVIE_BACKDROP_CDN + backdrop}
                    alt=""
                />
            )}
            {trailerVideo && (
                <iframe
                    className="trailer-video-iframe"
                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`}
                    title="Movie trailer"
                    tabIndex={-1}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setTimeout(() => setVideoReady(true), 1200)}
                ></iframe>
            )}
            <div className="hero-vignette"></div>
        </div>
    );
};

export default VideoBackground;
