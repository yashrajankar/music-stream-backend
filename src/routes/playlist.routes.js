const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../controllers/playlist.controller");
const { playSong } = require("../controllers/song.controller");

router.post("/", auth, createPlaylist);

router.get("/", auth, getMyPlaylists);

router.get("/:id", auth, getPlaylistById);

router.delete("/:id", auth, deletePlaylist);

router.post("/:playlistId/songs/:songId", auth, addSongToPlaylist);

router.delete("/:playlistId/songs/:songId", auth, removeSongFromPlaylist);
router.post("/:id/play", auth, playSong);

module.exports = router;
