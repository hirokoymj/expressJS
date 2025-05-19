const express = require("express");
const app = express();
const port = 3000;

// Middleware Example 1
const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};
app.use(myLogger);

// Middleware Example 2
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user/:id", (req, res, next) => {
  res.send("USER");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
