const express = require("express");
const movieModel = require("../models/Movie");

const router = express.Router();

router.get("/movies", async (req, res) => {
  try {
    // Fetch movies from the database using the Movie model
    const movies = await movieModel.findAll();

    // Return the list of movies
    res.json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
