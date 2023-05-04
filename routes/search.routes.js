const express = require("express");
const router = express.Router();
const Show = require("../models/Show.model");
const User = require("../models/User.model");
const { favFilter } = require("../utils/favFilter");

// GET search page

router.get("/", async (req, res, next) => {
  try {
    const isLoggedinValue = !!req.session.user;
    const searchTerms = req.query.search;

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
        endDate.setDate(endDate.getDate());

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
      case "thismonth":
        beginDate = new Date();
        beginDate.setUTCHours(0, 0, 0, 0);
        beginDate.setDate(1);
        endDate = new Date(beginDate);
        endDate.setMonth(beginDate.getMonth() + 1);
        endDate.setDate(0);
        break;
      case "nextmonth":
        beginDate = new Date();
        beginDate.setUTCHours(0, 0, 0, 0);
        beginDate.setMonth(beginDate.getMonth() + 1);
        beginDate.setDate(1);
        endDate = new Date(beginDate);
        endDate.setMonth(beginDate.getMonth() + 1);
        endDate.setDate(0);
        break;
    }

    const searchTermsReg = req.query.search
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .split(" ");

    const searchRegex = new RegExp(searchTermsReg.join("|"), "gi");

    const searchResultsArr = await Show.find({
      title: searchRegex,
      date:
        beginDate && endDate
          ? { $gte: beginDate, $lte: endDate }
          : { $exists: true },
    })
      .sort({ title: 1, date: 1 })
      .exec();

    const searchUserFavShows = await favFilter(
      req,
      Show,
      null,
      searchResultsArr
    );

    res.render("search", {
      searchUserFavShows,
      searchTerms,
      isLogin: isLoggedinValue,
      searchValue: req.query.search,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
