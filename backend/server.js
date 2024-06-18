const bodyParser = require("body-parser");
const express = require("express");
const router = require("./routes/default.ts").default;
const cors = require('cors');

const { json } = bodyParser;
const app = express();

// front end dist path
const path = require('path');
const { resolve } = require('path');
const publicPath = resolve(__dirname, '../frontend/dist');
const staticConf = { maxAge: '1y', etag: false };

// Parse JSON requests
// app.use(cors({ origin: "http://localhost:9000" }));

app.use(express.json());
app.use(express.static(publicPath, staticConf));

// Use movies router for /api/movies endpoint
app.use(express.json({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use("/api", router);

// const PORT = process.env.PORT || 3000;
const { PORT = 8080 } = process.env;

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '../frontend/dist/index.html'))
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
