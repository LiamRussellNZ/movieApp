// src/MovieList.tsx
import { error } from 'console';
import React, { useState, useEffect } from 'react';

interface Movie {
  title: string;
  director: string
}

const MovieList: React.FC = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [director, setDirector] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then((response) => response.json())
      .then((data: Movie[]) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === 'Movie title') {
      setMovieTitle(e.target.value);
    } else if (e.target.placeholder === 'Director') {
      setDirector(e.target.value);
    }
  };

  const handleAddMovie = () => {
  if (movieTitle.trim() !== '' && director.trim() !== '') {
    // Create a new movie object
    const newMovie = { title: movieTitle, director };

    // Make a POST request to the backend
    fetch('http://localhost:3000/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then((movie) => {
        // Add the new movie to the list of movies
        setMovies([...movies, movie]);

        // Clear the input fields
        setMovieTitle('');
        setDirector('');
      })
      .catch((error) => {
        console.error('Error adding movie:', error);
        setError('Error adding movie. Please try again.');
      });
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
      <div>
    <ul>
      {movies.map((movie, index) => (
        <li key={index}>
          {movie.title} - Directed by {movie.director}
        </li>
      ))}
    </ul>
  </div>
    </div>
  );
};

export default MovieList;
