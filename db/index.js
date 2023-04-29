// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/findeatre";

// Import of the models
const Artist = require("../models/Artist.model");
const Show = require("../models/Show.model");
const User = require("../models/User.model");

const showdata = require("../database/showdata.json");
const artistData = require("../database/artistdata.json");

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .then(() => {
    const updateOperations = showdata.map((show) => {
      //  $set operator update the existing document
      return {
        updateOne: {
          filter: { title: show.title },
          update: { $set: show },
          upsert: true, // creates new document if it doesn't exist
        },
      };
    });
    return Show.bulkWrite(updateOperations);
  })
  .then((result) => {
    console.log("Show data updated", result);
  })
  .then(() => {
    const updateOperations = artistData.map((artist) => {
      //  $set operator update the existing document
      return {
        updateOne: {
          filter: { name: artist.name },
          update: { $set: artist },
          upsert: true, // creates new document if it doesn't exist
        },
      };
    });
    return Artist.bulkWrite(updateOperations);
  })
  .then((result) => {
    console.log("Artist data updated", result);
  })
  .then(() => {
    return Show.find();
  })
  .then((shows) => {
    return shows.forEach((show) => {
      ["author", "director", "cast"].forEach((field) => {
        //only works if the fields are arrays
        show[field].forEach((artistName) => {
          Artist.findOne({ name: artistName })
            .then((artist) => {
              if (artist) {
                artist.shows.push(show._id);
                artist.save();
              }
            })
            .catch((err) => console.error(err));
        });
      });
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
