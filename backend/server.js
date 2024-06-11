const bodyParser = require("body-parser");
const express = require("express");
const router = require("./dist/routes/default.js").default;
const cors = require('cors');

const { json } = bodyParser;
const app = express();

// Parse JSON requests
app.use(cors({ origin: "http://localhost:9000" }));

// Use movies router for /api/movies endpoint
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
