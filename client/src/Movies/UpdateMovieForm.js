import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'

const initialMovie = {
  title: "",
  director: "",
  metascore: 100,
  stars: []
};

const UpdateMovieForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const history = useHistory();

  useEffect(()=> {
  })

  const changeHandler = e => {
    e.persist();
    const value = e.target.value;

    if(e.target.name === 'metascore'){
      value = parseInt(value, 10);   
    }

    setMovie({
      ...movie,
      [ e.target.name ]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios.put(`http://localhost:5000//api/movies/${id}`, movie)
    .then( res => {
      console.log("response from put: ", res);

    })
    .catch( err => {
      console.log("There was an error updating movie: ", err)

    });

  };
  
  console.log("Movie List passed as props", props.movieList)
  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline"/>
        
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        
        />

        <div className="baseline"/>

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        
        />

        <div className="baseline"/>
        
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>

      </form>


    </div>
  );
};
export default UpdateMovieForm;