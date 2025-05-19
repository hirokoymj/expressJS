const express = require("express");
const app = express();
const port = 3000;

// Middleware Example 1
// const myLogger = function (req, res, next) {
//   console.log("LOGGED");
//   next();
// };

// app.use(myLogger);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Middleware Example 2
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get("/", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
