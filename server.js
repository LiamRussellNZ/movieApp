// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Parse JSON requests
app.use(bodyParser.json());

// Set up a connection to your PostgreSQL database
const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: 'movies',
  password: dbPass,
  port: 5432,
});

app.get('/api/movies', async (req, res) => {
  try {
    // Fetch movies from the database
    const result = await pool.query('SELECT * FROM movies');
    const movies = result.rows;

    // Return the list of movies
    res.json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));