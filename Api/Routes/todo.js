const express = require("express");
const isAuth = require("../../middlewares/Auth");
const Todo = require("../../models/todo");
const User = require("../../models/user");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

router.post("/addtodo", isAuth, (req, res) => {
  const { title, description, creator } = req.body;
  Todo.create({
    title,
    description,
    creator,
  })
    .then((response) => {
      res.status(200).json({
        message: `your todo have been saved with a title of '${response.title}'`,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/", isAuth, (req, res) => {
  Todo.find({ creator: req.userData._id }, (err, singleTodo) => {
    if (err) {
      return res.send(err.message);
    } else {
      return res.send(singleTodo);
    }
  });
});

router.delete("/deletetodo", isAuth, (req, res) => {
  Todo.deleteMany({}, (err, removed) => {
    if (err) {
      return err;
    } else {
      return res.send("sucessfully deleted All todos");
    }
  });
});

router.delete("/deletepost/:id", isAuth, (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
    if (err) {
      return err;
    } else {
      return res.send("deletedTodo");
    }
  });
});

router.put("/updatepost/:id", isAuth, (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
    if (err) {
      return err;
    } else {
      res.send("updated todo");
    }
  });
});

router.get("/currentuser", isAuth, async (req, res) => {
  let { _id } = req.userData;

  let you = await User.findById(_id);
  res.send(you);
});

router.put("/profileimage", isAuth, (req, res) => {
  let { _id } = req.userData;
  let foundUser = User.findById(_id);
  const { averter } = req.body;
  if (foundUser) {
    cloudinary.config({
      cloud_name: "defbw7rt6",
      api_key: "812499342985472",
      api_secret: "Am0APQjSXJu9LePZSki4HcX5jMo",
    });

    cloudinary.uploader.upload(
      averter,
      {
        width: 512,
        height: 512,
        crop: "scale",
        allowed_formats: ["jpg", "png", "jpeg", "svg", "bmp"],
        public_id: "",
        folder: "profile_image",
      },
      function (error, result) {
        if (error) {
          return console.log(error);
        }
        User.findByIdAndUpdate(
          { _id },
          {
            $set: {
              avarter: result.secure_url,
            },
          }
        )
          .then(() => {
            return res.send("image sucessfully uploaded");
          })
          .catch((err) => {
            res.send(err);
            console.log(err);
          });
      }
    );
  }
});

module.exports = router;
