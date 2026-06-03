const mongoose = require("mongoose");

// PLAYLIST SCHEMA
// Stores user-created playlists and their songs
const playlistSchema = new mongoose.Schema(
  {
    // playlist name given by user
    name: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },

    // owner of the playlist (user who created it)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // list of songs inside the playlist
    songs: [
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

module.exports = mongoose.model("Playlist", playlistSchema);