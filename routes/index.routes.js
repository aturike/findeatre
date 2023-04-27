const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

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
