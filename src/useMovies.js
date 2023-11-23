import { useState, useEffect } from "react";
const KEY = "841fa614";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "false") throw new Error("Movie not found!");
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (!query?.length) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {};
    },
    [query]
  );

  return { movies, error, isLoading };
}
