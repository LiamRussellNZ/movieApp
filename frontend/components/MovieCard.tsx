import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    director: string;
  };
  onDelete: (id: number) => void;
  onEdit: (movie: { id: number; title: string; director: string }) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete, onEdit }) => {
    return (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>{movie.title}</h3>
              <p>Directed by {movie.director}</p>
            </div>
            <div>
              <button onClick={(e) => { e.stopPropagation(); onEdit(movie); }} style={{ marginRight: '10px' }}>Modify</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(movie.id); }}>Delete</button>
            </div>
          </div>
        </Link>
      );
};

export default MovieCard;