const express = require('express');
const router = express.Router();

/* GET shows page */
router.get("/shows", (req, res, next) => {
  res.render("shows");
});

/* GET show details page */
router.get("/shows/:id", (req, res, next) => {
  res.render("showdetail");
});

/* GET artists page */
router.get("/artists", (req, res, next) => {
  res.render("artists");
});

/* GET artist details page */
router.get("/artists/:id", (req, res, next) => {
  res.render("artistdetail");
});

module.exports = router;
