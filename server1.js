const express = require("express");
const app = express();

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.set("view engine", "ejs");

// app.get("/", (req, res, next) => {
//   console.log("Hi");
//   //res.render("index", { text: "world" });
// });

app.get("/", (req, res, next) => {
  res.send("this is GET request");
  // const err = new Error("Synchronous error occurred!");
  // err.statusCode = 404;
  // return next(err);
});

app.get("/async-error", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Async error occurred!"));
  } catch (err) {
    next(err);
  }
});

app.get("/example", (req, res, next) => {
  try {
    if (true) {
      const error = new Error("Data not available");
      error.statusCode = 123;
      return next(error);
    }
    //res.json(data);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack (optional)

  res.status(err.statusCode || 500);

  res.json({
    error: {
      message: err.message + statusCode || "Internal Server Error",
    },
  });
});

// const userRouter = require("./routes/users");
// app.use("/users", userRouter);

app.listen(3000);
