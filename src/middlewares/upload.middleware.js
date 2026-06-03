const multer = require("multer");
const path = require("path");
const fs = require("fs");

// create folder if it doesn't exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};


// AUDIO FILE STORAGE CONFIG

// storage settings for audio files (songs)
const audioStorage = multer.diskStorage({
  // folder where audio files will be stored
  destination: (req, file, cb) => {
    ensureDir("uploads/songs");
    cb(null, "uploads/songs");
  },

  // generate unique filename for audio file
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// allow only audio files
const audioFilter = (req, file, cb) => {
  const allowed = [".mp3", ".wav"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only mp3 and wav allowed"));
  }
};

// multer instance for uploading audio files
const uploadAudio = multer({
  storage: audioStorage,
  fileFilter: audioFilter,
});


// COVER IMAGE STORAGE CONFIG

// storage settings for cover images
const coverStorage = multer.diskStorage({
  // folder where images will be stored
  destination: (req, file, cb) => {
    ensureDir("uploads/covers");
    cb(null, "uploads/covers");
  },

  // generate unique filename for images
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// allow only image files
const imageFilter = (req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"));
  }
};

// multer instance for uploading cover images
const uploadCover = multer({
  storage: coverStorage,
  fileFilter: imageFilter,
});

module.exports = {
  uploadAudio,
  uploadCover,
};