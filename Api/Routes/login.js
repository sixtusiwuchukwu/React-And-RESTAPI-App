const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const generateAuthToken = require("../../middlewares/generateToken");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { username, password } = req.body;
    User.findOne({
      username
    })
      .then(existing_user => {
        if (existing_user) {
          bcrypt.compare(password, existing_user.password, (err, passed) => {
            if (!passed) {
              return res.send("incorrect user password");
            }
            token = generateAuthToken(existing_user);
            details = { token, existing_user };
            return res.header("x-auth", token).send(details);
          });
        } else {
          return res.send("user not found");
        }
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
