const express = require("express");
const router = express.Router();

const movies = [
  { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 102, name: "Inception", year: 2010, rating: 8.7 },
  { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
  { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 },
];

router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.status(200).json(movies);
});

/*
Get a movie
URL:http://localhost:3000/movies/102
Error Test URL: http://localhost:3000/movies/99
*/
router.get("/:id", (req, res, next) => {
  const movie = movies.filter((movie) => movie.id == req.params.id);
  if (movie.length === 0) {
    res.status(400).json({ message: "Bad Request" });
  } else {
    res.status(200).json(movie[0]);
  }
});

/*
Create a movie
Method: POST
URL:http://localhost:3000/movies/
new movie {"name":"Terminal","year":"1995","rating":"9.0"}
error: {"name": "Paul alian", "rating":"8.5"}
*/
router.post("/", (req, res, next) => {
  const { name = "", year = 0, rating = 0.0 } = req.body;
  if (name === "" || year === 0 || rating === 0.0) {
    res.status(400).json({ message: "Bad Request" });
  } else {
    movies.push({
      id: movies[movies.length - 1].id + 1,
      name,
      year,
      rating,
    });
    res
      .status(201)
      .json({ message: "New movie created.", location: "/movies/" + newId });
  }
});

/*
Update a movie
Method: PUT
URL: http://localhost:3000/movies/103
Sample data{ id: 103, name: "The Dark Knight", year: 2008, rating: 5 },
Error data: {"year": 2008, "rating": 5 },
*/
router.put("/:id", (req, res, next) => {
  const { name = "", year = 0, rating = 0.0 } = req.body;
  if (name === "" || year === 0 || rating === 0.0 || req.params.id === "") {
    // const error = new Error(
    //   "Bad Request"
    // );
    // error.statusCode = 400;
    res.status.json({ message: "Bad Request" });
  } else {
    const found = movies.find((data) => data.id == req.params.id);
    if (found) {
      found.name = name;
      found.year = year;
      found.rating = rating;
      res.status(200).json({
        message: "Movie id " + req.params.id + " updated.",
        location: "/movies/" + req.params.id,
      });
    }
  }
});

/*
Delete a movie
Method: DELETE
URL: http://localhost:3000/movies/101
erorr URL: http://localhost:3000/movies/99 (The id=99 does not exist.) 
*/
router.delete("/:id", (req, res, next) => {
  const removeIndex = movies.findIndex((data) => data.id == req.params.id);
  if (removeIndex === -1) {
    res.status(404).json({ message: "Not found the movie" });
  } else {
    movies.splice(removeIndex, 1);
    res.status(204).send({ message: "Movie id " + req.params.id + " removed" });
  }
});
// router.delete("/:id", (req, res, next) => {
//   const removeIndex = movies.findIndex((data) => data.id == req.params.id);
//   if (removeIndex === -1) {
//     const error = new Error("Not found the movie");
//     error.statusCode = 404;
//     next(error);
//   } else {
//     movies.splice(removeIndex, 1);
//     res.status(204).send({ message: "Movie id " + req.params.id + " removed" });
//   }
// });

// Error Handling
router.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack (optional)
  res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = router;
