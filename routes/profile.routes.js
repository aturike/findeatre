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
    const favoriteShows = await User.findById(userId)
      .populate("favoriteshows")
      //.select({
      //  favoriteshows: 1,
      //  _id: 0,
      // });

    const amsterdamShows = await Show.find()
      .sort({ date: 1 })
      .find({ city: "Amsterdam" })
      .exec();

    const parisShows = await Show.find()
      .sort({ date: 1 })
      .find({ city: "Paris" })
      .exec();

    const isLoggedin = !!req.session.user;

    res.render("myshows", {
      amsterdamshows: amsterdamShows,
      parisshows: parisShows,
      favoriteshows: favoriteShows,
      isLogin: isLoggedin,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET show details page from Profile
router.get("/shows/:id", (req, res, next) => {
  res.render("showdetail");
});
*/

/* GET show details page from Profile*/
router.get(`/myshows/:showId`, async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId);
    console.log(show);
    if (!show) {
      res.redirect("/myshows");
    } else {
      res.redirect("/shows/:showId");
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET My artists page 
router.get("/artists", (req, res, next) => {
  res.render("artists");
});
*/

router.get("/artists", async (req, res, next) => {
  try {
    const artists = await Artist.find()
      .populate(shows)
      .sort({ name: 1 })
      .exec();

    const myArtists = await Artist.find()
      .populate(shows)
      .sort({ name: 1 })
      .find({ favorite: "true" })
      .exec();

    res.render("myartists", { artists: artists, myartists: myArtists });
  } catch (error) {
    console.log(error);
  }
});

/* GET artist details page */
router.get("/artists/:id", (req, res, next) => {
  res.render("artistdetail");
});

module.exports = router;
