const express = require("express");
const router = express.Router();

//router.use(logger);

router.get("/", (req, res, next) => {
  console.log(req.query.name);
  res.send("User list");
});

router.post("/", (req, res) => {
  const isValid = false;
  if (isValid) {
    console.log(req.body.firstName);
    res.redirect(`/users/${users.length - 1}`);
  } else {
    res.render("/users/new", { firstName: req.body.firstName });
  }
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get User With ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`);
  });

const users = [{ name: "Kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
  console.log(id);
  req.user = users[id];
  next();
});

// function logger(req, res, next) {
//   console.log(req.originalUrl);
// }
module.exports = router;
