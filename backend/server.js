const bodyParser = require("body-parser");
const express = require("express");
const router = require("./routes/default.ts").default;

const app = express();

const path = require('path');
const { resolve } = require('path');
const publicPath = resolve(__dirname, '../frontend/dist');
const staticConf = { maxAge: '1y', etag: false };

app.use(express.static(publicPath, staticConf));

// Middleware to log memory usage
app.use((req, res, next) => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    next();
  });

app.use(express.json({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use("/api", router);

const { PORT = 8080 } = process.env;

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '../frontend/dist/index.html'))
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
