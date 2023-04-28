const express = require("express");
const router = express.Router();

const Show = require("../models/Show.model");

/* GET home page 
router.get("/", (req, res, next) => {
  res.render("index");
});
*/

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

// GET search page

router.get("/search", async (req, res, next) => {
  try {
    const isLoggedinValue = !!req.session.user;

    const sortTerm = req.query.sortdate;
    let beginDate = null;
    let endDate = null;

    switch (sortTerm) {
      case "reset":
        beginDate = null;
        endDate = null;
        break;
      case "today":
        beginDate = new Date();
        beginDate.setUTCHours(0, 0, 0, 0);
        endDate = new Date(beginDate);
        endDate.setDate(endDate.getDate() + 1);
        console.log(beginDate, endDate);
        break;
      case "thisweek":
        beginDate = new Date();
        beginDate.setUTCHours(0, 0, 0, 0);
        const dayOfWeek = beginDate.getDay();
        beginDate.setDate(
          beginDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        );
        endDate = new Date(beginDate);
        endDate.setDate(endDate.getDate() + 6);
        break;
    }

    const searchTerms = req.query.search
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .split(" ");

    const searchRegex = new RegExp(searchTerms.join("|"), "gi");

    const searchResultsArr = await Show.find({
      title: searchRegex,
      date:
        beginDate && endDate
          ? { $gte: beginDate, $lte: endDate }
          : { $exists: true },
    })
      .sort({ title: 1, date: 1 })
      .exec();

    res.render("search", { searchResultsArr, isLogin: isLoggedinValue });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
