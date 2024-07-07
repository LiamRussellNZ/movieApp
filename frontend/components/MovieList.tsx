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
  const [synopsis, setSynopsis] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/movies')
      .then((response) => response.json())
      .then((data: Movie[]) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.placeholder) {
      case 'Movie title':
        setMovieTitle(e.target.value);
        break;
      case 'Director':
        setDirector(e.target.value);
        break;
      case 'Synopsis':
        setSynopsis(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleAddMovie = () => {
  if (movieTitle.trim() !== '' && director.trim() !== '') {
    const newMovie = { title: movieTitle, director, synopsis: synopsis.trim() ? synopsis : undefined};

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
        setSynopsis('');
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
  <div className="container mt-3">
    <div className="row">
      <div className="col-12">
        <h1>Movie List</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          value={movieTitle}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Movie title"
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          value={director}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Director"
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          value={synopsis}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Synopsis"
        />
      </div>
      <div className="col-md-3">
        <button type='button' className='btn btn-success' onClick={handleAddMovie}>
          <i className="bi bi-plus-circle-fill"></i> Add Movie
        </button>
      </div>
    </div>
    {error && <div className='alert alert-danger mt-2'>{error}</div>}
    <div className="row">
      <div className="col-12">
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
    </div>
  </div>
);
};

export default MovieList;
export { Movie };
