import { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { useFetchData } from "../axios";
import "./Banner.css";
import Error from "./Error";

const Banner = ({ fetchUrl }) => {
  const [movie, setMovie] = useState([]);
  const [trailerOn, setTrailerOn] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [url, setUrl] = useState(false);
  const { request, error } = useFetchData();

  useEffect(() => {
    request(fetchUrl).then((res) =>
      setMovie(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      )
    );
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handleClick = (movie) => {
    setTrailerOn((prev) => !prev);
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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const errorMessage = error ? <Error /> : null;
  return (
    <header>
      {errorMessage}
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => handleClick(movie)}
            >
              Play
            </button>
            <button className="banner__button">My List</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className="banner__fadeBottom" />
      </div>
      {url ? (
        <div className="apologyWords">Sorry we can't find the trailer</div>
      ) : (
        trailerOn && (
          <div className="trailer">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          </div>
        )
      )}
    </header>
  );
};

export default Banner;
