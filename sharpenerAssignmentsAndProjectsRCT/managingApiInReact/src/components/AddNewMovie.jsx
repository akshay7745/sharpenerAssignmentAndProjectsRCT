import React, { useEffect, useState } from "react";

const AddNewMovie = (props) => {
  // const [newMovieAdded, setNewMovieAdded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    openingText: "",
    date: "",
  });
  // useEffect(() => {
  //   if (newMovieAdded) {
  //     addMovieHandler(formData);
  //   }
  // }, [newMovieAdded]);
  const { title, openingText, date } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addMovieHandler = async () => {
    try {
      const response = await fetch(
        "https://reactmoviebackend-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await props.getMovies();
      } else {
        throw new Error("Failed to add new movie , please try again...");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setNewMovieAdded();
    addMovieHandler();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title </label>
        <input
          value={title}
          onChange={handleChange}
          name="title"
          id="title"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="opening_text">Opening Text </label>
        <textarea
          onChange={handleChange}
          id="opening_text"
          rows={5}
          cols={75}
          placeholder="Enter text"
          name="openingText"
          value={openingText}
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          onChange={handleChange}
          type="date"
          id="date"
          value={date}
          name="date"
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddNewMovie;
