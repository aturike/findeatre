const express = require("express");
const router = express.Router();
const bcryptjs = require("bcrypt");
const User = require("../models/User.model");
const {
  isLoggedOut,
  isLoggedIn,
} = require("../middleware/route-guard.middleware.js");

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/;

router.get("/login", isLoggedOut, (req, res, next) => {
  if (req.query.user === "error") {
    res.render("login", {
      errorMessage: "You have to log in first to add shows to your favourites",
    });
  } else {
    res.render("login", { errorMessage: "" });
  }
});

router.post("/login", isLoggedOut, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!!user) {
      if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
        req.session.user = { username: user.username, userId: user._id };
        console.log("Succesful log in");
        res.redirect("/");
      } else {
        res.render("login", { errorMessage: "Invalid password" });
      }
    } else {
      res.render("login", { errorMessage: "Invalid user" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signup", isLoggedOut, async (req, res, next) => {
  try {
    console.log(req.body.password);

    if (passwordRegex.test(req.body.password)) {
      const salt = await bcryptjs.genSalt(9);
      const passwordHash = bcryptjs.hashSync(req.body.password, salt);

      await User.create({
        username: req.body.username,
        email: req.body.email,
        passwordHash,
      });
      res.redirect("/auth/login");
    } else {
      res.render("login", {
        errorMessage:
          "Password has to have at least 1 capital, 1 number and least 6 long",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/show/:id", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const { favoriteshows } = await User.findById(userId).select({
      favoriteshows: 1,
      _id: 0,
    });

    if (favoriteshows.indexOf(req.params.id) === -1) {
      await User.findByIdAndUpdate(userId, {
        $push: { favoriteshows: req.params.id },
      });
      console.log("push", req.params.id);
    } else {
      console.log("remove", req.params.id);
    }
  } catch (error) {
    console.log(error);
  }
  req.params.id;
});

module.exports = router;
