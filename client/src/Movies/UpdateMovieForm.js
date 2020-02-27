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
  

  console.log("This is id: ", id)

  useEffect(()=> {
    const movieToUpdate= props.movieList.find(movie =>`${movie.id}` === id);
    console.log("Movie to update", movieToUpdate);

    if(movieToUpdate) {
      setMovie(movieToUpdate);
      console.log("Movie to update", movieToUpdate);

    }

  }, [props.movieList, id])

    const formatMovie = (movie) => {
    
    console.log("this is movie to format: ", movie)

    if(Array.isArray(movie.stars)){
      return movie;

    }else {
      // formattedMovieStars = movie.stars.split(", ");
      const formattedMovie = {
        ...movie,
        stars: movie.stars.split(/\s*(?:,|$)\s*/) || movie.stars

      }
      return formattedMovie
    }
  }
  // const formattedMovie = {
  //   ...movie,
  //   
  // }
  const changeHandler = e => {
    e.persist();
    const value = e.target.value;

    

 

    setMovie({
      ...movie,
      [ e.target.name ]: value

    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    


    const submittedMovie = formatMovie(movie)
  
    
    axios.put(`http://localhost:5000/api/movies/${id}`, submittedMovie )
    .then( res => {
      console.log("response from put: ", res);
      // props.setMovieList(res.data)
      // props.setMovieList(res.data)
      // console.log("movie list returned from put: ", props.movieList)
      const updatedMovie = res.data;
      const NewMovieList = props.movieList.map(movie => {
        if(movie.id !== updatedMovie.id){
          return movie
        }
        return updatedMovie;
      })  
      props.setMovieList(NewMovieList);
      setMovie(initialMovie);
      history.push('/');
      
 

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