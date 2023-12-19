import DisplayPage from "./DisplayPage";
import MovieList from "./MovieList";
import { useState } from "react";
import MovieDetails from "./MovieDetails";
import MovieSummary from "./MovieSummary";
import Loading from "./Loading";
import Error from "./Error";
import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import NavBar from "./NavBar";

const average = (arr) => {
  return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};

// const averageRuntime = average(watchedMovies.map((movie) => movie.runtime));

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watchedMovieList, setWatchedMovieList] = useLocalStorageState(
    [],
    "watchedMovie"
  );
  // const [watchedMovieList, setWatchedMovieList] = useState(function () {
  //   const watched = localStorage.getItem("watchedMovie");
  //   return JSON.parse(watched);
  // });
  const { movies, loading, error } = useMovie(query);
  const handleAddtoList = (newMovie) => {
    setWatchedMovieList((movieList) => [...movieList, newMovie]);
    console.log(watchedMovieList);
    setSelectedId(false);
    // console.log(averageImdbRating);
  };
  const averageImdbRating = average(
    watchedMovieList.map((movie) => movie.imdbRating)
  );
  const averageRuntime = average(
    watchedMovieList.map((movie) => movie.runtime)
  );
  const averageUserRating = average(
    watchedMovieList.map((movie) => movie.extRating)
  );
  const handleDeleteMovie = (id) => {
    setWatchedMovieList((watchedMovieList) =>
      watchedMovieList.filter((movie) => movie.imdbID !== id)
    );
  };

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
    console.log(selectedId);
  }
  function handleClose() {
    setSelectedId((selectedId) => null);
  }
  return (
    <div>
      <NavBar query={query} setQuery={setQuery} movies={movies} />
      <Body>
        <DisplayPage>
          {loading && <Loading></Loading>}
          {!loading && !error && (
            <MovieList
              movies={movies}
              handleSelectedId={handleSelectedId}
              selectedId = {selectedId}
            ></MovieList>
          )}
          {error && <Error error={error} />}
        </DisplayPage>
        <DisplayPage>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleAddtoList={handleAddtoList}
              watchedMovieList={watchedMovieList}
              handleClose={handleClose}
            />
          ) : (
            <MovieSummary
              watchedMovieList={watchedMovieList}
              averageImdbRating={averageImdbRating}
              averageRuntime={averageRuntime}
              averageUserRating={averageUserRating}
              handleDeleteMovie={handleDeleteMovie}
            />
          )}
        </DisplayPage>
      </Body>
    </div>
  );
}

function Body({ children }) {
  return <div className="pages">{children}</div>;
}
export default App;
