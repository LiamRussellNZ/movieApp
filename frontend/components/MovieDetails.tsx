import React from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from './MovieList';

// Dummy function to fetch movie details. Replace with actual API call.
const fetchMovieById = async (id: string): Promise<Movie | undefined> => {
  // Implement the fetch call to your backend to get the movie details by ID
  return undefined;
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
      <h2>Directed by {movie.director}</h2>
    </div>
  );
};

export default MovieDetails;