const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    imagesrc: {
      type: String,
      required: false,
      default:
        "https://www.opensds.io/wp-content/uploads/sites/18/2019/03/user-unknown-white-300x300.png",
    },
    passwordHash: {
      type: String,
      required: true,
    },
    favoriteshows: {
      type: [Schema.Types.ObjectId],
      ref: "Show",
      required: false,
    },
    favoriteartists: {
      type: [Schema.Types.ObjectId],
      ref: "Artist",
      required: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
