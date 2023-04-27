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
        shows: {
          type: [Schema.Types.ObjectId],
          ref: "Show",
          required: false,
        },
        newsSubscription: {
            type: Boolean,
            required: true
        },
        image: {
            type: String,
            required: false
        },
      },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
      }
);

const Artist = model("Artist", artistSchema);
    
module.exports = Artist;
    