import * as express from "express";
import { Request, Response } from "express";
import Movie from "../models/Movie";

const router = express.Router();

router.get("/movies", async (req: Request, res: Response) => {
  try {
    // Fetch movies from the database using the Movie model
    const movies: Movie[] = await Movie.findAll();

    // Return the list of movies
    res.json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/movies", async (req, res) => {
  try {
    // Extract movie data from the request body
    const { title, director } = req.body;

    // Validate that both title and director are provided
    if (!title || !director) {
      return res.status(400).json({ error: "Title and director are required" });
    }

    // Create a new movie in the database using the Movie model
    const newMovie = await Movie.create({ title, director });

    // Return the newly created movie
    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Error creating movie:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
