// src/MovieList.tsx
import { error } from 'console';
import React, { useState } from 'react';
import { Movie } from '../../backend/models/Movie';


const MovieList: React.FC = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [director, setDirector] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === 'Movie title') {
      setMovieTitle(e.target.value);
    } else if (e.target.placeholder === 'Director') {
      setDirector(e.target.value);
    }
  };

  const handleAddMovie = () => {
    if (movieTitle.trim() !== '' && director.trim() !== '') {
      setMovies([...movies, new Movie(movieTitle, director)]);
      setDirector('');
      setMovieTitle('');
    } else {
      setError('Both movie title and director are required to be filled in to add a movie.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddMovie();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={movieTitle}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Movie title"
        />
        <input
          type="text"
          value={director}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Director"
        />
        <button type='button' className='btn btn-success' onClick={handleAddMovie}><i className="bi bi-plus-circle-fill"></i></button>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
      <ul>
        {movies.map((movie, index) => (
          <React.Fragment key={index}>
            <div>
              <li>{movie.title} - Directed by {movie.director}</li>
              <button type='button' className='btn btn-danger' onClick={() => setMovies(movies.filter((_, i) => i !== index))}><i className="bi bi-trash-fill"></i></button>
            </div>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
