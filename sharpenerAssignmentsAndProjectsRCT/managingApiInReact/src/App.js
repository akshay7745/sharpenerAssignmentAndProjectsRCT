import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  async function getMovies() {
    try {
      const res = await fetch("https://swapi.dev/api/films");

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
