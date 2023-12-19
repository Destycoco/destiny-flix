function MovieList({ movies, handleSelectedId, selectedId }) {
  return (
    <div className="movie-list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectedId={handleSelectedId}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}
function Movie({ movie, handleSelectedId, selectedId }) {
  return (
    <div
      className="movie"
      onClick={() => handleSelectedId(movie.imdbID)}
      style={{
        backgroundColor: `${selectedId === movie.imdbID ? "black" : ""}`,
        cursor: "pointer",
      }}
    >
      <div className="image">
        <img src={movie.Poster} alt="" />
      </div>
      <div>
        <h2>{movie.Title}</h2>
        <p className="year">
          <span> 🗓 </span>
          {movie.Year}
        </p>
      </div>
    </div>
  );
}
export default MovieList;
