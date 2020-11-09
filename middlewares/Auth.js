const jwt = require("jsonwebtoken");
<<<<<<< HEAD
// require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "cool");

=======

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.jwt_secret_key);
>>>>>>> 3f86b8c0fd82976902c603c65c4c39c5777c4c75
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
<<<<<<< HEAD
      message: "Auth failed",
=======
      message: "Auth failed"
>>>>>>> 3f86b8c0fd82976902c603c65c4c39c5777c4c75
    });
  }
};
