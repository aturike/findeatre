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

module.exports = router;
