import React, { useState } from "react";

const AddNewMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    openingText: "",
    date: "",
  });
  const { title, openingText, date } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
