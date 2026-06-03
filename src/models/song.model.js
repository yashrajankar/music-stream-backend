const mongoose = require("mongoose");

// SONG SCHEMA
// Stores all details related to a song in the system
const songSchema = new mongoose.Schema(
  {
    // song title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // artist name who created the song
    artist: {
      type: String,
      required: true,
      trim: true,
    },

    // album name the song belongs to
    album: {
      type: String,
      required: true,
      trim: true,
    },

    // duration of song in seconds
    duration: {
      type: Number,
      required: true,
    },

    // cover image URL of the song
    coverImage: {
      type: String,
      default: "",
    },

    // audio file URL (uploaded file path)
    audioUrl: {
      type: String,
      default: "",
    },

    // number of times song has been played
    playCount: {
      type: Number,
      default: 0,
    },
  },
  {
    // automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);