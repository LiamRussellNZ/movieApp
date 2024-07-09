import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from "../components/App";
import MovieDetails from "../components/MovieDetails";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <Router>
    <Routes> 
      <Route path="/" element={<App />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </Router>
);