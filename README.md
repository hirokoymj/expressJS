# Express.js

## express.Router

- https://expressjs.com/en/guide/routing.html
- Use the `express.Router` class to create modular, mountable route handlers.
- The following example creates a router as a module, loads a middleware function in it.

**movies.js**

- Create a router file named movies.js in the routes directory

```js
const express = require("express");
const router = express.Router();

const movies = [
  { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 102, name: "Inception", year: 2010, rating: 8.7 },
  { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
  { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 },
];

//localhost:3000/movies
router.get("/", (req, res) => {
  res.json(movies);
});

//localhost:3000/movies/10
router.get("/:id", (req, res, next) => {
  const currentMovie = movies.filter((movie) => movie.id == req.params.id);
  res.json(currentMovie[0]);
});

module.exports = router;
```

**index.js**

- Then, load the router module in the app:

```js
const movies = require("./routes/movies");
app.use("/movies", movies);
```

<hr />

## Response methods

- [res.json()](https://expressjs.com/en/5x/api.html#res.json) - Send a JSON response.
- [res.redirect()](https://expressjs.com/en/5x/api.html#res.redirect) - Redirect a request.
- [res.send()](https://expressjs.com/en/5x/api.html#res.send) - Send a response of various types.
- https://expressjs.com/en/guide/routing.html

## Error handling

- [Express.js doc - Error Handling](https://expressjs.com/en/guide/error-handling.html)
- synchronous code - no extra work! If synchronous code throws an error, then Express will catch and process it.

## Middleware

### Application-level middleware

- Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD().

```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
```

### Application-level middleware with mount path

- This middleware is executed for any type of HTTP request on the /user/:id path.

```js
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

app.get("/user/:id", (req, res, next) => {
  res.send("USER");
});
```

### Router-level middleware

```js
const express = require("express");
const app = express();
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
```

### Router-level middleware with mount path

```js
// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);
```

### Error-handling middleware

- Error-handling middleware always takes four arguments `(err, req, res, next)`. The arguments cannot omit.

  ```js
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  ```

- **Synchronous** - No extra work; If synchronous code throws an error, then Express will catch and process it.
- **Asynchronous** - You must catch errors that occur in asynchronous code invoked by route handlers or middleware

```js
app.get("/", (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100);
});
```

**my example**

// movies.js

```js
router.get("/:id", (req, res, next) => {
  const currentMovie = movies.filter((movie) => movie.id == req.params.id);
  if (currentMovie.length === 0) {
    const error = new Error("Not Found the movie!!");
    error.statusCode = 404;
    next(error);
  } else {
    res.json(currentMovie[0]);
  }
});

// Error handling middleware placed on the bottom
router.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});
```

## References

- https://expressjs.com/en/guide/writing-middleware.html
- https://expressjs.com/en/5x/api.html
- **Bruno**: https://www.usebruno.com/
- https://expressjs.com/en/starter/basic-routing.html
- https://www.tutorialspoint.com/expressjs/expressjs_http_methods.htm
- https://www.geeksforgeeks.org/error-handling-in-express/
- https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm
