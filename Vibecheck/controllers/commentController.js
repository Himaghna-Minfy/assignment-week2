const Comment = require("../models/Comment");
const ErrorResponse = require("../utils/errorResponse");

// @desc Post comment on vibe
exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      user: req.user._id,
      vibe: req.params.vibeId,
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// @desc Get all comments for a vibe
exports.getCommentsForVibe = async (req, res, next) => {
  try {
    const comments = await Comment.find({ vibe: req.params.vibeId }).populate("user", "username");
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
