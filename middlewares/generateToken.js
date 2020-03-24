const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const generateAuthToken = user => {
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "cool")
    .toString();
  return token;
};

module.exports = generateAuthToken;
