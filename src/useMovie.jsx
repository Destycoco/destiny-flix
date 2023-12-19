import { useEffect, useState } from "react";
export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const abortCont = new AbortController();

    async function getMovies() {
      try {
        if (query.length < 3) return;
        setLoading(true);
        setError(""); // Clear any previous errors

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=74409b9d&s=${query}`,
          { signal: abortCont.signal }
        );

        if (!res.ok) {
          throw new Error("Unable to fetch movies");
        }

        const data = await res.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setError("");
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message); // Set the error state
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      // handleClose();
    }

    getMovies();

    // Ensure the cleanup function aborts the request
    return () => abortCont.abort();
  }, [query]);
  return { movies, loading, error };
}
