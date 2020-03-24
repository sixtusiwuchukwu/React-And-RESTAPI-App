const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoApi = require("./Api/Routes/todo");
const todo_login_Api = require("./Api/Routes/login");
const todo_signup_Api = require("./Api/Routes/signup");
const cors = require("cors");

const app = express();

const corsOption = {
  origin: "http://localhost:3000"
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOption));

app.use("/todo", todoApi);

app.use("/todo/login", todo_login_Api);

app.use("/todo/signup", todo_signup_Api);

mongoose
  .connect("mongodb://localhost:27017/learn", { useUnifiedTopology: true })
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

const port = process.env.port || 2080;

app.listen(port, () => {
  console.log(`app is connected on port ${port}`);
});
