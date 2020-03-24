const mongoose = require("mongoose");

const todoApp = new mongoose.Schema(
  {
    title: String,
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model("todo", todoApp);
module.exports = Todo;
