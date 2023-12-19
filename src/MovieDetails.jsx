import { useEffect, useState } from "react";
import StarRate from "./StarRate";
import { useKey } from "./useKey";
function MovieDetails({
  selectedId,
  handleAddtoList,
  watchedMovieList,
  handleClose,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const {
    Title: title,
    Year: year,
    Runtime: runtime,
    Genre: genre,
    Language: language,
    Plot: plot,
    Actors: actors,
    Director: director,
    imdbRating,
    Poster: poster,
    imdbID,
    Released: released,
  } = selectedMovie;
  const movieExist = watchedMovieList?.find(
    (movie) => movie.imdbID === selectedId
  );

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [extRating, setExtRating] = useState("");
  function handleAdd() {
    const watchedMovie = {
      title,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      year,
      poster,
      extRating,
      imdbID,
    };
    handleAddtoList(watchedMovie);
  }

  useKey("Escape", handleClose);
  useEffect(() => {
    async function getMovieDetails() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=74409b9d&i=${selectedId}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setSelectedMovie(data);
          setLoading(false);
        } else throw new Error("unable to get movie");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          setError(error.message);
          setLoading(false);
        }
      } finally {
      }
    }
    getMovieDetails();
  }, [selectedId]);
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => (document.title = "");
  }, [title]);
  return (
    <div key={selectedId}>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <div className="movie-details">
            <div className="detail-image">
              <button
                onClick={handleClose}
                style={{
                  backgroundColor: "green",
                  fontSize: "23px",
                  cursor: "pointer",
                  color: "white",
                  marginBottom: "10px",
                }}
              >
                Back
              </button>
              <img src={selectedMovie?.Poster} alt="" />
            </div>
            <div className="descriptions">
              <h2>{title}</h2>
              <p>{year}</p>
              <p>{runtime}</p>
              <p>Genre: {genre} </p>
              <p>Language: {language}</p>
              <p>⭐{imdbRating} imdbRating</p>
            </div>
            {error && <p>failed to get movie</p>}
          </div>
          <Rating
            handleAdd={handleAdd}
            extRating={extRating}
            setExtRating={setExtRating}
            movieExist={movieExist}
            selectedId={selectedId}
          ></Rating>
          <div className="descriptions">
            <p> Description: {plot}</p>
            <p>Starring: {actors}</p>
            <p>Director: {director}</p>
            <p>Released Date: {released}</p>
          </div>
        </>
      )}
    </div>
  );
}
function Rating({
  handleAdd,
  extRating,
  setExtRating,
  movieExist,
  selectedId,
}) {
  return (
    <div className="rating">
      {movieExist ? (
        <div style={{ fontSize: "25px", color: "red",  }}>
          You rated this movie {movieExist.extRating} ⭐
        </div>
      ) : (
        <>
          <StarRate color={"yellow"} extRating={setExtRating} />

          {extRating > 0 && <button onClick={handleAdd}>+ Add to list</button>}
        </>
      )}
    </div>
  );
}

export default MovieDetails;
