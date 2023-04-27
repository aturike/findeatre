const { Schema, model } = require("mongoose");

const showSchema = new Schema(
    {
        title: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        city: {
          type: String,
          required: true
        },
        location: {
            type: String,
            required: true
        },
        story: {
            type: String,
            required: true
        },
        author: {
            type: [String],
            required: true
        },
        director: {
            type: [String],
            required: true,
        },
        cast: {
            type: [String],
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

const Show = model("Show", showSchema);
    
module.exports = Show;
    