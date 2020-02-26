import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();
  const { id } = useParams(); 

  const movieSelected= movieList.find(movie =>`${movie.id}` === id);


  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const handleUpdate = e => {
    e.preventDefault();
    history.push(`/update-movie/${movieSelected.id}`)
    
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        history.push("/")
      });
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <button  onClick={saveMovie}>
        Save
      </button>
      <button onClick={handleUpdate}>
        Update
      </button>
      <button  onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
