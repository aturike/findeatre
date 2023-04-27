const express = require("express");
const router = express.Router();
const bcryptjs = require("bcrypt");
const User = require("../models/User.model");

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{2,}$/;

router.get("/login", (req, res, next) => {
  res.render("login", { errorMessage: "" });
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!!user) {
      if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
        req.session.user = { username: user.username };
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

router.post("/signup", async (req, res, next) => {
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
module.exports = router;
