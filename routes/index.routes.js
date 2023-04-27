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
