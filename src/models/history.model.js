const mongoose = require("mongoose");

// HISTORY SCHEMA
// Stores user listening activity (which song user played and when)
const historySchema = new mongoose.Schema(
  {
    // reference to user who played the song
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // reference to the song that was played
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },

    // timestamp of when the song was played
    playedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("History", historySchema);