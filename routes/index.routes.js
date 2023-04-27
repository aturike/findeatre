const express = require("express");
const router = express.Router();

const Show = require('../models/Show.model')

/* GET home page 
router.get("/", (req, res, next) => {
  res.render("index");
});
*/

router.get("/", async(req, res, next) => {
  try {
    const amsterdamShows = await Show.find()
    .sort({date: 1})
    .find({city: 'Amsterdam'})
    .exec();

    const parisShows = await Show.find()
    .sort({date: 1})
    .find({city: 'Paris'})
    .exec();

    res.render('index', {amsterdamshows: amsterdamShows, parisshows: parisShows})
  } catch (error) {
    console.log(error)
  }
})

/* GET show details page */
router.get("/shows/:id", (req, res, next) => {
  res.render("showdetail");
});

module.exports = router;
