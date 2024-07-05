import React from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from './MovieList';

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
    //setError('Error fetching movie. Please try again.');
    return undefined;
  }
};

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = React.useState<Movie | undefined>(undefined);

  React.useEffect(() => {
    if (typeof id === 'string') {
        fetchMovieById(id).then(setMovie);  
    } 
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <h3>Directed by {movie.director}</h3>
      <p>{movie.synopsis}</p>
    </div>
  );
};

export default MovieDetails;