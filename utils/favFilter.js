const Show = require("../models/Show.model");
const Artist = require("../models/Artist.model");
const User = require("../models/User.model");

// New array created by login User
async function favFilter(req, database, id, filtArr) {
  try {
    let allresults;

    if (!id && !filtArr) {
      allresults = await database.find().sort({ name: 1 }).exec();
    } else if (!filtArr) {
      allresults = [await database.findById(id)];
    } else {
      allresults = [...filtArr];
    }

    if (req.session.user) {
      const user = await User.findById(req.session.user.userId);
      let userfav;
      if (database === Artist) {
        userfav = user.favoriteartists;
      } else if (database === Show) {
        userfav = user.favoriteshows;
      }

      return allresults.map((result) => {
        if (userfav.indexOf(result._id) !== -1) {
          return { ...result._doc, favorite: true };
        } else {
          return { ...result._doc, favorite: false };
        }
      });
    } else {
      return allresults.map((result) => {
        return { ...result._doc, favorite: false };
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { favFilter };
