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
      errorMessage:
        "You have to log in first to add shows or artists to your favourites",
      username: "",
      email: "",
    });
  } else if (req.query.user === "sign-up-error-pass") {
    res.render("login", {
      errorMessage:
        "Password has to contain 1 Capital, 1 Number, 1 Special character and has to have a minimum length of 6",
      username: req.query.username,
      email: req.query.email,
    });
  } else if (req.query.user === "sign-up-error-user") {
    res.render("login", {
      errorMessage: "Username must be filled in",
      username: "",
      email: "",
    });
  } else if (req.query.user === "user-in-use") {
    res.render("login", {
      errorMessage: "Username already exists. Please choose another one",
      username: "",
      email: "",
    });
  } else {
    res.render("login", { errorMessage: "", username: "", email: "" });
  }
});

router.post("/login", isLoggedOut, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!!user) {
      if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
        req.session.user = {
          username: user.username,
          userId: user._id,
          useremail: user.email,
          userimagesrc: user.imagesrc,
        };
        console.log("Succesful log in");
        res.redirect("/home");
      } else {
        res.render("login", {
          errorMessage: "Invalid password",
          username: req.body.username,
          email: "",
        });
      }
    } else {
      res.render("login", {
        errorMessage: "Invalid user",
        username: "",
        email: "",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signup", isLoggedOut, async (req, res, next) => {
  try {
    if (!req.body.username) {
      const err = encodeURIComponent("sign-up-error-user");
      res.redirect("/auth/login?user=" + err);
    } else {
      const isUserexist = await User.find({ username: req.body.username });
      if (isUserexist) {
        const err = encodeURIComponent("user-in-use");
        res.redirect("/auth/login?user=" + err);
      }

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
        const err = encodeURIComponent("sign-up-error-pass");
        const username = encodeURIComponent(req.body.username);
        const email = encodeURIComponent(req.body.email);
        res.redirect(
          "/auth/login?user=" +
            err +
            "&username=" +
            username +
            "&email=" +
            email
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
});

/* Add a show to a user's favorite*/
router.get("/show/:id", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const { favoriteshows } = await User.findById(userId).select({
      favoriteshows: 1,
      _id: 0,
    });

    const showId = req.params.id;

    if (favoriteshows.indexOf(showId) === -1) {
      await User.findByIdAndUpdate(userId, {
        $push: { favoriteshows: showId },
      });
      console.log("push", showId);
    } else {
      await User.findByIdAndUpdate(userId, {
        $pull: { favoriteshows: { $in: [showId] } },
      });
      console.log("remove", showId);
    }

    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
  req.params.id;
});

/* Add an artist to a user's favorite*/

router.get("/artists/:id", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const { favoriteartists } = await User.findById(userId).select({
      favoriteartists: 1,
      _id: 0,
    });

    const artistId = req.params.id;

    if (favoriteartists.indexOf(artistId) === -1) {
      await User.findByIdAndUpdate(userId, {
        $push: { favoriteartists: artistId },
      });
      console.log("push", artistId);
    } else {
      await User.findByIdAndUpdate(userId, {
        $pull: { favoriteartists: { $in: [artistId] } },
      });
      console.log("remove", artistId);
    }

    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
  req.params.id;
});

module.exports = router;
