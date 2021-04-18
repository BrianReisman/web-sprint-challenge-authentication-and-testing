const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Model = require("./models");
const jwtsecret = 'shh'

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
  const { password } = req.body;
  const user = req.body;

  if (!user.password || !user.username) {
    res.status(400).json({ message: "username and password required" });
  }

  Model.findByName(req.body).then((user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome, ${user.username}`,
        token,
      });
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  });
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtsecret, options);
}

module.exports = router;
