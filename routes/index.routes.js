const express = require("express");
const router = express.Router();

const Show = require("../models/Show.model");
const Artist = require("../models/Artist.model");

/* GET home page  listing all shows*/
router.get("/", async (req, res, next) => {
  try {
    const amsterdamShows = await Show.find()
      .sort({ date: 1 })
      .find({ city: "Amsterdam" })
      .exec();

    const parisShows = await Show.find()
      .sort({ date: 1 })
      .find({ city: "Paris" })
      .exec();

    const isLoggedin = !!req.session.user;

    res.render("index", {
      amsterdamshows: amsterdamShows,
      parisshows: parisShows,
      isLogin: isLoggedin,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET show details page from Home*/
router.get(`/shows/:showId`, async (req, res) => {
  try {
    const isLoggedinValue = !!req.session.user;
    const show = await Show.findById(req.params.showId);
    console.log(show);
    if (!show) {
      res.redirect("/shows");
    } else {
      res.render("showdetail", { show, isLogin: isLoggedinValue });
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET all artists page listing all artists*/
router.get("/artists", async (req, res, next) => {
  try {
    const allartists = await Artist.find()
      .sort({ name: 1 })
      .exec();

    const isLoggedin = !!req.session.user;

    res.render("allartists", {
      allartists: allartists,
      isLogin: isLoggedin,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET artist details page from Home*/
router.get(`/artists/:artistId`, async (req, res) => {
  try {
    const isLoggedinValue = !!req.session.user;

    const artist = await Artist.findById(req.params.artistId);
    console.log("Here is the artist : " + artist);

    const shows = await Artist.findById(req.params.artistId)
    .populate("shows")
    .select({
      shows: 1,
    });

    console.log("Here are his shows : " + shows);

    const futureshows = await Artist.findById(req.params.artistId)
    .populate("shows")
    .select({
      shows: 1,
    })
    .find({ "shows.date" : "2023-05-01T00:00:00.000Z"} )
    .exec();
    
    console.log("Here are his upcoming shows : " + futureshows);

    if (!artist) {
      res.redirect("/artists");
    } else {
      res.render("artistdetail", {
        artist, 
        shows,
        futureshows, 
        isLogin: isLoggedinValue 
      });
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET logout page */
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log("Succesfull log out");
      res.redirect("/");
    }
  });
});

module.exports = router;
