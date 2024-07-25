import * as express from "express";
import { Request, Response } from "express";
import MovieModel from "../models/Movie";
import { v4 as uuidv4 } from "uuid";
import { stdout } from "process";

const router = express.Router();

router.get("/movies", async (req: Request, res: Response) => {
  try {
    stdout.write("Fetching movies\n");
    stdout.write(
      "Req data: \n" +
        JSON.stringify({
          url: req.url,
          method: req.method,
          headers: req.headers,
        }) +
        "\n"
    );
    // Fetch movies from the database using the Movie model
    const movies: InstanceType<typeof MovieModel>[] =
      await MovieModel.scan().exec();

    const responseBody = { movies };
    stdout.write("Response body: \n" + JSON.stringify(responseBody) + "\n");

    // Return the list of movies
    res.json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/movies/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`Request to fetch movie with id: ${id}`);

    const movie = await MovieModel.get(id);

    if (!movie) {
      console.log(`Movie with id ${id} not found`);
      return res.status(404).json({ error: "Movie not found" });
    }

    const { title, director, synopsis } = movie;
    res.json({ title, director, synopsis });
  } catch (err) {
    console.error("Error fetching movie:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/movies", async (req, res) => {
  try {
    const movies = req.body;

    console.log("Request to create movies", movies);

    if (!Array.isArray(movies)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const createdMovies = await Promise.all(
      movies.map(async (movie) => {
        const { title, director, synopsis, releaseYear } = movie;

        if (!title || !director) {
          throw new Error("Title and director are required");
        }

        const id = uuidv4();

        const newMovie = await MovieModel.create({
          id,
          title,
          director,
          synopsis,
          releaseYear,
        });

        return newMovie;
      })
    );

    res.status(201).json(createdMovies);
  } catch (err) {
    console.error("Error creating movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/movies/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(`Request to update movie with id: ${id}`);

    const movie = await MovieModel.get(id);
    if (!movie) {
      console.log(`Movie with id ${id} not found`);
      return res.status(404).json({ error: "Movie not found" });
    }

    const updatedMovie = await MovieModel.update({ id, ...updateData });

    res.json(updatedMovie);
  } catch (err) {
    console.error("Error updating movie:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Request to delete movie with id: ${id}`);

    const movie = await MovieModel.get(id);

    if (!movie) {
      console.log(`Movie with id ${id} not found`);
      return res.status(404).json({ error: "Movie not found" });
    }

    await MovieModel.delete(id);

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
