import React from "react";
import MovieList from "./MovieList";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>Movie List</h1>
      <MovieList />
    </div>
  );
};

export default App;
