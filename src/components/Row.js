import movieTrailer from "movie-trailer";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { useFetchData } from "../axios";
import "./Row.css";
import Error from "./Error";
import Loader from "./Loader";

const bease_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [sliderCounter, setSliderCounter] = useState(0);
  const [url, setUrl] = useState(false);
  const { request, loading, error } = useFetchData();

  useEffect(() => {
    request(fetchUrl).then((res) => setMovies(res.data.results));
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          if (!url) {
            setUrl((prev) => !prev);
          } else {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const moveToLeft = () => {
    if (sliderCounter >= 0) {
      setSliderCounter(0);
    } else {
      setSliderCounter((prev) => prev + 190 * 2);
    }
  };

  const moveToRight = () => {
    if (sliderCounter <= -12 * 190) {
      setSliderCounter(-13 * 190);
    } else {
      setSliderCounter((prev) => prev - 190 * 2);
    }
  };

  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Loader /> : null;

  return (
    <div className="row">
      <h2>{title}</h2>
      {errorMessage}
      {spinner}

      <div className="row__posters">
        <div
          className="arrow__left"
          onClick={() => {
            moveToLeft();
          }}
        ></div>
        {movies.map((movie) => (
          <div
            className="slider"
            key={movie.id}
            onClick={() => handleClick(movie)}
            style={{
              transform: `translateX(${sliderCounter}px)`,
            }}
          >
            <img
              src={`${bease_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`${isLargeRow ? "row__posterLarge" : "row__poster"}`}
            />
            <div className="poster__name">
              {movie?.title?.length > 20
                ? movie?.title?.slice(0, 17) + "..."
                : movie?.title}
              {movie?.name?.length > 20
                ? movie?.name?.slice(0, 16) + "..."
                : movie?.name}
            </div>
          </div>
        ))}
        <div
          className="arrow__right"
          onClick={() => {
            moveToRight();
          }}
        ></div>
      </div>

      {url ? (
        <div className="apologyWords">Sorry we can't find the trailer</div>
      ) : (
        trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
      )}
    </div>
  );
};

export default Row;
