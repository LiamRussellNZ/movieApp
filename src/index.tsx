// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import MovieList from './components/MovieList';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>Movie List</h1>
      <MovieList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
