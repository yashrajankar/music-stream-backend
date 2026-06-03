const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const { getListeningHistory } = require("../controllers/user.controller");

router.get("/history", auth, getListeningHistory);

module.exports = router;
