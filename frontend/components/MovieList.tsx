import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  director: string,
  synopsis?: string;
}

const MovieList: React.FC = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [director, setDirector] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/movies')
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
    const newMovie = { title: movieTitle, director };

    fetch('/api/movies', {
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
        setMovies([...movies, movie]);

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

  const handleDeleteMovie = (id: number) => {
  fetch(`/api/movies/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.json();
    })
    .then(() => {
      setMovies(movies.filter((movie) => movie.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting movie:', error);
      setError('Error deleting movie. Please try again.');
    });
}

const handleEditMovie = (movie: Movie) => {/*...*/};

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
      {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={handleDeleteMovie}
            onEdit={handleEditMovie}
          />
      ))}
      </ul>
    </div>
  );
};

export default MovieList;
export { Movie };
