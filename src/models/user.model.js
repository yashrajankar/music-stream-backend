const mongoose = require("mongoose");

// USER SCHEMA
// Stores user information for authentication and app features
const userSchema = new mongoose.Schema(
  {
    // username of the user
    username: {
      type: String,
      required: true,
      trim: true,
    },

    // email used for login (must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // hashed password stored in database
    password: {
      type: String,
      required: true,
    },

    // role defines access level (user or admin)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // list of songs liked by user
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    // adds createdAt and updatedAt automatically
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);