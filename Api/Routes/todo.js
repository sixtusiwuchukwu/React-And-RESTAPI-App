const express = require("express");
const isAuth = require("../../middlewares/Auth");
const Todo = require("../../models/schema");

const router = express.Router();

router.post("/add_todo", isAuth, (req, res) => {
  const { title, description, creator } = req.body;
  Todo.create({
    title: title,
    description: description,
    creator: creator
  })
    .then(res => console.log("saved"))
    .catch(err => console.log(err));
});

router.get("/:id", isAuth, (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }
  Todo.find({ creator: req.params.id }, (err, singleTodo) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(singleTodo);
    }
  });
});

router.delete("/delete-todo", isAuth, (req, res) => {
  Todo.deleteMany({}, (err, removed) => {
    if (err) {
      return err;
    } else {
      console.log("deleted");
    }
  });
});

router.delete("/delete-post/:id", (req, res) => {
  console.log(req.params);
  Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(deletedTodo);
      console.log("deleted...");
    }
  });
});

router.put("/update-post/:id", (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
    if (err) {
      console.log(err);
    } else {
      res.send(updated);
      console.log(updated);
    }
  });
});
router.put("/update-post", (req, res) => {
  const { averter } = req.body;
  User.findByIdAndUpdate(
    { _id: new ObjectID("5df256d2391c6c256abc5732") },
    {
      $set: {
        averter: "hello"
      },
      returnOriginal: false
    }
  )
    .then(result => {
      console.log("saved", result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
