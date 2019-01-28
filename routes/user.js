var express = require("express");
var router = express.Router();
var User = require("../models/Users");

router.get("/users", (req, res, next) => {
  User.find((err, users) => {
    if (users.length == 0) {
      res.json({ msg: "Users Not Found" });
    } else {
      res.json({ msg: users });
    }
  });
});

router.post("/addUser", (req, res, next) => {
  let newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age
  });
  User.findOne({ first_name: req.body.first_name }, (err, result) => {
    if (result) {
      res.json({ msg: "already inserted" });
    } else {
      newUser.save((err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ msg: "Successfully added", result: result });
        }
      });
    }
  });
});

router.put("/user/:id", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age
      }
    },
    (err, result) => {
      if (err) {
        res.json({ err: "Error: " + err });
      } else {
        res.json({ msg: "Sucessfully Updated", result: result });
      }
    }
  );
});

router.delete("/user/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, result) => {
    if (!result) {
      res.json({ msg: "User is already deleted" });
    } else {
      User.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
          res.json({ err: "fail to delete " });
        } else {
          res.json({ msg: "Sucessfully Deleted" });
        }
      });
    }
  });
});

router.get("/user/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json({ err: "fail to get UserDetails " });
    } else {
      res.json({ msg: "Show User Details", result: result });
    }
  });
});

module.exports = router;
