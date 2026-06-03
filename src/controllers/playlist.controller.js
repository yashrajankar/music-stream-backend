const Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");

// Creates a new playlist for the logged-in user
const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create({
      name: req.body.name,
      owner: req.user.id, // playlist belongs to logged-in user
    });

    res.status(201).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Fetch all playlists created by the logged-in user
const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({
      owner: req.user.id,
    }).populate("songs"); // fetch full song details

    res.status(200).json({
      success: true,
      count: playlists.length,
      data: playlists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Returns a single playlist with songs and owner details
const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate("songs")
      .populate("owner", "username email"); // only show selected owner fields

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Deletes playlist only if it belongs to the logged-in user
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id, // ensures user can delete only their playlist
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Adds a song to playlist if it doesn't already exist
const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const song = await Song.findById(req.params.songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // prevent duplicate songs in playlist
    if (playlist.songs.includes(song._id)) {
      return res.status(400).json({
        success: false,
        message: "Song already exists in playlist",
      });
    }

    playlist.songs.push(song._id);
    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Song added",
      data: playlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Removes a song from playlist using filter
const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // remove song by filtering out matching songId
    playlist.songs = playlist.songs.filter(
      (songId) => songId.toString() !== req.params.songId
    );

    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Song removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};