const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const {
  uploadAudio,
  uploadCover,
} = require("../middlewares/upload.middleware");

const {
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
} = require("../controllers/song.controller");

// Public Routes
router.get("/", getAllSongs);

router.get("/search", searchSongs);

router.get("/trending", getTrendingSongs);

router.get("/:id", getSongById);

// Protected Routes
router.post("/:id/play", auth, playSong);

// Admin Routes
router.post("/", auth, admin, createSong);

router.put("/:id", auth, admin, updateSong);

router.delete("/:id", auth, admin, deleteSong);

router.post(
  "/:id/audio",
  auth,
  admin,
  uploadAudio.single("audio"),
  uploadSongAudio,
);

router.post(
  "/:id/cover",
  auth,
  admin,
  uploadCover.single("cover"),
  uploadSongCover,
);

module.exports = router;
