import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/MovieCard.css";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    director: string;
  };
  onDelete: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete }) => {
    return (
        <Link to={`/movie/${movie.id}`} className='movie-card'>
          <div className="movie-card-content">
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Directed by {movie.director}</p>
            </div>
            <div className="movie-actions">
              <button onClick={(e) => { e.stopPropagation(); onDelete(movie.id); }}>Delete</button>
            </div>
          </div>
        </Link>
      );
};

export default MovieCard;