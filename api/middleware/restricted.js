const jwt = require("jsonwebtoken");
const jwtsecret = 'shh'

module.exports = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    jwt.verify(token, jwtsecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "token invalid" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "token required" });
  }
  // next();
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
