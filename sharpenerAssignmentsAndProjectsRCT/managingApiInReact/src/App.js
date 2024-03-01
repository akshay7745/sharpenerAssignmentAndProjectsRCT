import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddNewMovie from "./components/AddNewMovie";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(error, new Date().getSeconds());
  useEffect(() => {
    getMovies();
  }, []);
  useEffect(() => {
    let intervalId = "";
    if (error) {
      intervalId = setInterval(() => {
        getMovies();
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [error]);
  console.log(error);
  async function getMovies() {
    try {
      setIsLoading(true);
      const res = await fetch("https://swapi.dev/api/films");
      if (!res.ok) {
        throw new Error("Something went wrong ...Retrying!!!");
      }
      const data = await res.json();
      const updatedMovies = data?.results.map((movie) => {
        const { episode_id, opening_crawl, release_date, title } = movie;
        return {
          id: episode_id,
          title: title,
          releaseDate: release_date,
          openingText: opening_crawl,
        };
      });
      setMovies(updatedMovies);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <React.Fragment>
      <section>
        <AddNewMovie />
      </section>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && !error && <h2>Loading Please wait...</h2>}
        {!isLoading && !error && <MoviesList movies={movies} />}
        {error && (
          <>
            <h3>{error}</h3>
            <button onClick={() => setError(null)}>cancle</button>
          </>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
