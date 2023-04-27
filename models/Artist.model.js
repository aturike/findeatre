const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        bio: {
          type: String,
          required: true
        },
        upcomingShows: {
            type: [String],
            required: true
        },
        pastShows: {
            type: [String],
            required: true,
        },
        newsSubscription: {
            type: boolean,
            required: true
        },
        image: {
            type: String,
            required: true
        },
      },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
      }
);

const Artist = model("Artist", artistSchema);
    
module.exports = Artist;
    