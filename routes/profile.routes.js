const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Show = require("../models/Show.model");
const Artist = require("../models/Artist.model");
const {
  isLoggedOut,
  isLoggedIn,
} = require("../middleware/route-guard.middleware.js");

/* GET My shows page */
router.get("/myshows", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const { favoriteshows } = await User.findById(userId)
      .populate("favoriteshows")
      .select({
        favoriteshows: 1,
        _id: 0,
      });

    const isLoggedin = !!req.session.user;

    res.render("myshows", {
      favoriteshows: favoriteshows,
      isLogin: isLoggedin,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET show details page from Profile*/
router.get("/myshows/:showId", async (req, res) => {
  try {
    const isLoggedinValue = !!req.session.user;
    const show = await Show.findById(req.params.showId);

    if (!show) {
      res.redirect("/myshows");
    } else {
      res.redirect(`/shows/${req.params.showId}`);
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET My artists page */
router.get("/myartists", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const { favoriteartists } = await User.findById(userId)
      .populate("favoriteartists")
      .select({
        favoriteartists: 1,
        _id: 0,
      });

    const isLoggedin = !!req.session.user;

    res.render("myartists", {
      favoriteartists: favoriteartists,
      isLogin: isLoggedin,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET artist details page from Profile */
router.get("/myartists/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) {
      res.redirect("/myartists");
    } else {
      res.redirect(`/artists/${req.params.artistId}`);
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET profile page from Profile */
router.get("/", isLoggedIn, async (req, res) => {
  const userId = req.session.user.userId;
  const user = await User.findById(userId);
  res.render("profile", { isLogin: true, user });
});

/* Modify my email address */
router.post("/edit/email/:userid", isLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userid, {
      email: req.body.newMail,
    });
    console.log("Succesfully changed email of user", req.params.userid);
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

/* Modify my profile picture */

const uploader = require('../middleware/cloudinary.config.js');

router.get("/edit/img/:userid", isLoggedIn, (req, res) => {
  const user = req.session.user;
  res.render("profile", { isLogin: true, user });
});

router.post("/edit/img/:userid", isLoggedIn, uploader.single("imageUrl"), async (req, res, next) => {
  try {
    const image = req.file.path;
    await User.findByIdAndUpdate(req.params.userid, {
      imagesrc : image,
    })
    res.redirect("/profile")
  } catch (error) {
    console.log(error)
    res.redirect("/profile")
  }

  if (!req.file) {
    console.log("there was an error uploading the file")
    next(new Error('No file uploaded!'));
    return;
  }
})

module.exports = router;
