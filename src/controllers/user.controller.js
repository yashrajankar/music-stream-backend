const History = require("../models/history.model");

// Fetches songs played by the logged-in user
const getListeningHistory = async (req, res) => {
  try {
    const history = await History.find({
      user: req.user.id, // only current user's history
    })
      .populate("song", "title artist coverImage") // get basic song details
      .sort({ playedAt: -1 }); // latest played first

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getListeningHistory,
};
