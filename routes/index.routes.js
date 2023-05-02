const express = require("express");
const router = express.Router();

const Show = require("../models/Show.model");
const Artist = require("../models/Artist.model");
const User = require("../models/User.model")

/* GET home page  listing all shows*/
router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.find();

    const amsterdamShows = await Show.find()
      .sort({ date: 1 })
      .find({ city: "Amsterdam" })
      .exec();

    const parisShows = await Show.find()
      .sort({ date: 1 })
      .find({ city: "Paris" })
      .exec();

    const isLoggedin = !!req.session.user;

    let isFavorite = {}

    if (req.session.user) {
      const user = await User.findById(req.session.user.userId);

      isFavorite = shows.map(show =>{
        if(user.favoriteshows.indexOf(show._id) !== -1){
          return {...show._doc, favorite: true}
        } else {
          return {...show._doc, favorite: false}
        }
      }) 
    } else {
      isFavorite = shows.map(show =>{
      return {...show._doc, favorite: false}
      })
    }
    console.log(isFavorite)
    

    res.render("index", {
      shows: shows,
      amsterdamshows: amsterdamShows,
      parisshows: parisShows,
      isLogin: isLoggedin,
      isfavorite: isFavorite
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
    const artists = await Artist.find();
    const castArr = [];
    const authorArr = [];
    const directorArr = [];

    [...show.cast].forEach((castmember) => {
      castArr.push(artists.filter((artist) => artist.name === castmember)[0]);
    });

    [...show.author].forEach((author) => {
      authorArr.push(artists.filter((artist) => artist.name === author)[0]);
    });

    [...show.director].forEach((director) => {
      directorArr.push(artists.filter((artist) => artist.name === director)[0]);
    });

    console.log(castArr);
    if (!show) {
      res.redirect("/shows");
    } else {
      res.render("showdetail", {
        show,
        isLogin: isLoggedinValue,
        castArr,
        authorArr,
        directorArr,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

/* GET all artists page listing all artists*/
router.get("/artists", async (req, res, next) => {
  try {
    const allartists = await Artist.find().sort({ name: 1 }).exec();

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

    const { shows } = await Artist.findById(req.params.artistId)
      .populate("shows")
      .select({
        shows: 1,
      });

    console.log("Here are his shows : " + shows);

    const futureshows = shows.filter((show) => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return show.date >= today;
    });

    console.log("Here are his upcoming shows : " + futureshows);

    const pastshows = shows.filter((show) => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return show.date < today;
    });

    console.log("Here are his past shows : " + pastshows);

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
      res.redirect("/");
    }
  });
});

module.exports = router;
