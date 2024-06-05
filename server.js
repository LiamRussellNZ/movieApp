const express = require('express');
const { json } = require('body-parser');
const moviesRouter = require('./backend/routes/default');

const app = express();

// Parse JSON requests
app.use(json());

// Use movies router for /api/movies endpoint
app.use('/api', moviesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
