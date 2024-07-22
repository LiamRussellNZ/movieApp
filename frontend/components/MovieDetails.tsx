import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from './MovieList';
import '../styles/MovieDetails.css';

const fetchMovieById = async (id: string): Promise<Movie | undefined> => {
  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return undefined;
  }
};

const updateMovie = async (id: string, movie: Movie): Promise<void> => {
  try {
    await fetch(`/api/movies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
  } catch (error) {
    console.error('Error updating movie:', error);
  }
};

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [editedMovie, setEditedMovie] = useState<Movie | undefined>(undefined);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchMovieById(id).then(movie => {
        setMovie(movie);
        setEditedMovie(movie);
      });
    }
  }, [id]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedMovie(prev => ({ ...prev, [name]: value } as Movie));
  };

  const saveEdits = () => {
    if (editedMovie && id) {
      updateMovie(id, editedMovie).then(() => {
        setMovie(editedMovie);
        toggleEditMode();
      });
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      {editMode ? (
        <>
          <input className="movie-title-edit" name="title" value={editedMovie?.title} onChange={handleInputChange} />
          <input className="movie-director-edit" name="director" value={editedMovie?.director} onChange={handleInputChange} />
          <textarea className="movie-synopsis-edit" name="synopsis" value={editedMovie?.synopsis} onChange={handleInputChange} />
          <button onClick={saveEdits}>Save</button>
        </>
      ) : (
        <>
          <h1 className="movie-title">{movie.title}</h1>
          <h3 className="movie-director">Directed by {movie.director}</h3>
          <p className="movie-synopsis">{movie.synopsis}</p>
          <button onClick={toggleEditMode}><i className="fas fa-pencil-alt"></i>Edit</button>
        </>
      )}
    </div>
  );
};

export default MovieDetails;