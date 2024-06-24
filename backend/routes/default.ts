import * as express from "express";
import { Request, Response } from "express";
import MovieModel from "../models/Movie";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/movies", async (req: Request, res: Response) => {
  try {
    // Fetch movies from the database using the Movie model
    const movies: InstanceType<typeof MovieModel>[] =
      await MovieModel.scan().exec();

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

    // Generate a unique ID for the new movie
    const id = uuidv4();

    // Create a new movie in the database using the Movie model
    const newMovie = await MovieModel.create({ id, title, director });

    // Return the newly created movie
    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Error creating movie:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    // Extract the movie ID from the request parameters
    const { id } = req.params;
    console.log(`Request to delete movie with id: ${id}`);

    // Find the movie with the specified ID
    const movie = await MovieModel.findByPk(id);

    // If the movie is not found, return a 404 error
    if (!movie) {
      console.log(`Movie with id ${id} not found`);
      return res.status(404).json({ error: "Movie not found" });
    }

    // Delete the movie from the database
    await movie.destroy();

    // Return a success message
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
