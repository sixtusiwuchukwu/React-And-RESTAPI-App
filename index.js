require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoApi = require("./Api/Routes/todo");
const todo_login_Api = require("./Api/Routes/login");
const todo_signup_Api = require("./Api/Routes/signup");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,PATCH,UPDATE"
    );
    return res.status(200).json({});
  }
  next();
});

app.use("/todo", todoApi);

app.use("/todo/login", todo_login_Api);

app.use("/todo/signup", todo_signup_Api);

mongoose
  // .connect(
  //   "mongodb+srv://sixtus4545:@sixtus4545@sixtusdb-cqswn.mongodb.net/test?retryWrites=true&w=majority",
  //   { useNewUrlParser: true }
  // )
  .connect(process.env.database, { useNewUrlParser: true })
  .then(() => {
    setTimeout(() => {
      console.log("Database connected");
    }, 4000);
  })

  .catch(err => {
    setTimeout(() => {
      console.log("could not connect");
    }, 4000);
    console.log("...connecting to database");
  });

// mongoose.Promise = global.Promise;

const port = process.env.port || 2080;

app.listen(port, () => {
  console.log(`app is connected on port ${port}`);
});
