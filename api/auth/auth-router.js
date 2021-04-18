const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Model = require("./models");

router.post("/register", async (req, res) => {
  let user = req.body;

  if (!user.password || !user.username) {
    res.status(400).json({ message: "username and password required" });
  }

  const hash = bcrypt.hashSync(user.password, 8); // bcrypt before saving
  user.password = hash;

  const exists = await Model.findByName(user);
  if (exists) {
    res.status(400).json({ message: "username taken" });
  }

  Model.add(user)
    .then((response) => {
      res.status(201).json({ id: response[0], ...user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  res.end("implement login, please!");
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
