import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddNewMovie from "./components/AddNewMovie";
function App() {
  const [movies, setMovies] = useState([]);
  // const [newMovieAdded, setNewMovieAdded] = useState(false);
  const [movieDeleted, setMovieDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    getMovies();
  }, []);
  useEffect(() => {
    if (movieDeleted) {
      deleteMovie(movieDeleted);
    }
  }, [movieDeleted]);
  const handleMovieDeleted = (id) => {
    setMovieDeleted(id);
  };
  async function deleteMovie(id) {
    const response = await fetch(
      `https://reactmoviebackend-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      await getMovies();
    } else {
      throw new Error("Something went wrong while deleting the movie");
    }
  }
  async function getMovies() {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://reactmoviebackend-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!res.ok) {
        throw new Error("Something went wrong...Retrying!!!");
      }
      const data = await res.json();
      const moviesCollection = [];

      for (let key in data) {
        moviesCollection.push({
          title: data[key].title,
          openingText: data[key].openingText,
          date: data[key].date,
          id: key,
        });
      }
      setMovies(moviesCollection);
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
        <AddNewMovie getMovies={getMovies} />
      </section>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && !error && <h2>Loading Please wait...</h2>}
        {!isLoading && !error && (
          <MoviesList movies={movies} onMovieDeleted={handleMovieDeleted} />
        )}
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
