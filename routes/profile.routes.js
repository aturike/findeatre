const express = require('express');
const router = express.Router();

const Show = require('../models/Show.model')
const Artist = require('../models/Artist.model')

/* GET My shows page */
router.get("/shows", (req, res, next) => {
  res.render("shows");
});

/* GET show details page from Profile
router.get("/shows/:id", (req, res, next) => {
  res.render("showdetail");
});
*/

/* GET show details page from Profile*/
router.get(`/shows/:showId`, async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
    console.log(show)
    if(!show) {
      res.redirect('/shows')
    } else {
      res.redirect('/shows/:showId');
    }
  } catch (error) {
    console.log(error)
  }
});

/* GET My artists page 
router.get("/artists", (req, res, next) => {
  res.render("artists");
});
*/

router.get("/artists", async(req, res, next) => {
  try {
    const artists = await Artist.find()
    .populate(shows)
    .sort({name: 1})
    .exec();

    const myArtists = await Artist.find()
    .populate(shows)
    .sort({name: 1})
    .find({favorite: 'true'})
    .exec();

    res.render('myartists', {artists: artists, myartists: myArtists})
  } catch (error) {
    console.log(error)
  }
})

/* GET artist details page */
router.get("/artists/:id", (req, res, next) => {
  res.render("artistdetail");
});

module.exports = router;
