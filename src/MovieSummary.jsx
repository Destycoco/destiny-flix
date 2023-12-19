function MovieSummary({
  watchedMovieList,
  averageImdbRating,
  averageRuntime,
  averageUserRating,
  handleDeleteMovie,
}) {
  return (
    <div>
      <nav className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>{watchedMovieList.length} movies</p>
          <p>
            <span>⭐</span> {averageImdbRating.toFixed(2)}
          </p>
          <p>
            <span >⭐</span>{" "}
            {averageUserRating.toFixed(2)}
          </p>
          <p>{averageRuntime.toFixed(2)} mins</p>
        </div>
      </nav>
      <div className="watched-list">
        {watchedMovieList.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
      </div>
    </div>
  );
}
function WatchedMovie({ movie, handleDeleteMovie }) {
  return (
    <div className="watched-container">
      <div className="watched-image">
        <img src={movie.poster} alt="" />
      </div>
      <div className="watched-details">
        <h2>{movie.title}</h2>
        <div className="watched-rating">
          <p>
            <span>⭐ </span> {movie.imdbRating}
          </p>
          <p>⭐ {movie.extRating}</p>
          <p>{movie.runtime} mins</p>
        </div>
      </div>
      <button onClick={() => handleDeleteMovie(movie.imdbID)}>❌</button>
    </div>
  );
}
export default MovieSummary;
