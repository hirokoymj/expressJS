const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Route - movies
const movies = require("./routes/movies");

app.use("/movies", movies);

app.listen(3000);
