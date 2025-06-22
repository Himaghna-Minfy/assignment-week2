const Vibe = require("../models/vibe");
const Comment = require("../models/Comment");
const ErrorResponse = require("../utils/errorResponse");

// @desc Get all vibes (with pagination)
exports.getAllVibes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const vibes = await Vibe.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user", "username");

    const total = await Vibe.countDocuments();

    res.status(200).json({
      success: true,
      count: vibes.length,
      page,
      total,
      next: total > page * limit ? { page: page + 1, limit } : null,
      data: vibes,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get single vibe
exports.getSingleVibe = async (req, res, next) => {
  try {
    const vibe = await Vibe.findById(req.params.id).populate("user", "username");
    if (!vibe) return next(new ErrorResponse("Vibe not found", 404));
    res.status(200).json(vibe);
  } catch (err) {
    next(err);
  }
};

// @desc Create vibe
exports.createVibe = async (req, res, next) => {
  try {
    const vibe = await Vibe.create({
      vibeText: req.body.vibeText,
      mood: req.body.mood,
      song: req.body.song,
      user: req.user._id
    });
    res.status(201).json(vibe);
  } catch (err) {
    next(err);
  }
};


// @desc Delete vibe (Only creator)
exports.deleteVibe = async (req, res, next) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    if (!vibe) return next(new ErrorResponse("Vibe not found", 404));
    if (vibe.user.toString() !== req.user._id.toString())
      return next(new ErrorResponse("Not authorized", 403));

    await vibe.deleteOne();
    res.status(200).json({ success: true, message: "Vibe deleted" });
  } catch (err) {
    next(err);
  }
};

// @desc Like/Unlike vibe
exports.toggleLike = async (req, res, next) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    if (!vibe) return next(new ErrorResponse("Vibe not found", 404));

    const userId = req.user._id;
    if (vibe.likes.includes(userId)) {
      vibe.likes.pull(userId);
    } else {
      vibe.likes.push(userId);
    }

    await vibe.save();
    res.status(200).json({ success: true, likes: vibe.likes.length });
  } catch (err) {
    next(err);
  }
};

// @desc Personalized feed
exports.getFeed = async (req, res, next) => {
  try {
    const user = req.user;
    const followingIds = user.following;

    const vibes = await Vibe.find({ user: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate("user", "username");

    res.status(200).json(vibes);
  } catch (err) {
    next(err);
  }
};
