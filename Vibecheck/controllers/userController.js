const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

// @desc Follow a user
exports.followUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return next(new ErrorResponse("User not found", 404));

    if (!currentUser.following.includes(targetUser._id)) {
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);
      await currentUser.save();
      await targetUser.save();
    }

    res.status(200).json({ success: true, following: currentUser.following });
  } catch (err) {
    next(err);
  }
};
