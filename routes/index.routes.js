const express = require("express");
const router = express.Router();

const Show = require("../models/Show.model");
const Artist = require("../models/Artist.model");
const User = require("../models/User.model");
const { isError } = require("util");
const { favFilter } = require("../utils/favFilter");

router.get("/", (req, res, next) => {
  res.render("landing");
});

/* GET home page  listing all shows*/
router.get("/home", async (req, res, next) => {
  try {
    const isLoggedin = !!req.session.user;
    const shows = await favFilter(req, Show);

    res.render("index", {
      shows,
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
    const showId = req.params.showId;
    const [show] = await favFilter(req, Show, showId);

    const artists = await Artist.find();
    const castArr = [];
    const authorArr = [];
    const directorArr = [];

    /* Toggle option on favourite button for cast*/
    [...show.cast].forEach((castmember) => {
      castArr.push(artists.filter((artist) => artist.name === castmember)[0]);
    });

    const isFavoriteCast = await favFilter(req, Artist, null, castArr);

    /* Toggle option on favourite button for authors*/
    [...show.author].forEach((author) => {
      authorArr.push(artists.filter((artist) => artist.name === author)[0]);
    });

    const isFavoriteAuthor = await favFilter(req, Artist, null, authorArr);

    /* Toggle option on favourite button for directors*/
    [...show.director].forEach((director) => {
      directorArr.push(artists.filter((artist) => artist.name === director)[0]);
    });

    let isFavoriteDirector = await favFilter(req, Artist, null, directorArr);

    if (!show) {
      res.redirect("/shows");
    } else {
      res.render("showdetail", {
        show,
        isLogin: isLoggedinValue,
        castArr: isFavoriteCast,
        authorArr: isFavoriteAuthor,
        directorArr: isFavoriteDirector,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET all artists page listing all artists*/
router.get("/artists", async (req, res, next) => {
  try {
    const artist = await favFilter(req, Artist);

    const isLoggedin = !!req.session.user;

    res.render("allartists", {
      artist,
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
    const artistId = req.params.artistId;

    const [artist] = await favFilter(req, Artist, artistId);

    const { shows } = await Artist.findById(req.params.artistId)
      .populate("shows")
      .select({
        shows: 1,
      });

    const futureshows = shows.filter((show) => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return show.date >= today;
    });

    const pastshows = shows.filter((show) => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return show.date < today;
    });

    if (!artist) {
      res.redirect("/artists");
    } else {
      res.render("artistdetail", {
        artist,
        shows,
        futureshows,
        pastshows,
        isLogin: isLoggedinValue,
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
      res.redirect("/home");
    }
  });
});

module.exports = router;
