const mongoose = require("mongoose");
const Song = require("../models/song.model");
const History = require("../models/history.model");

// Adds a new song to the database
const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);

    res.status(201).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Fetches all songs from database
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Returns a single song based on ID
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Updates song details using ID
const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated document
    });

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Removes song from database
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Searches songs by title, artist, or album (case-insensitive)
const searchSongs = async (req, res) => {
  try {
    const keyword = req.query.q || req.query.keyword;

    const songs = await Song.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { artist: { $regex: keyword, $options: "i" } },
        { album: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Saves audio file path to song document
const uploadSongAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }

    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // store uploaded audio file path
    song.audioUrl = req.file.path;

    await song.save();

    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Saves cover image path to song document
const uploadSongCover = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    song.coverImage = req.file.path;

    await song.save();

    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Increases play count and stores user listening history
const playSong = async (req, res) => {
  try {
    const { id } = req.params;

    // validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid song ID",
      });
    }

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // increase play count
    song.playCount = (song.playCount || 0) + 1;
    await song.save();

    // store user listening history
    await History.create({
      user: req.user.id,
      song: song._id,
    });

    res.status(200).json({
      success: true,
      message: "Song played",
      playCount: song.playCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Returns top 10 most played songs
const getTrendingSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ playCount: -1 }).limit(10);

    res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  searchSongs,
  uploadSongAudio,
  uploadSongCover,
  playSong,
  getTrendingSongs,
};
