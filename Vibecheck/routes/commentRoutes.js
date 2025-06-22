const express = require("express");
const router = express.Router();
const { createComment, getCommentsForVibe } = require("../controllers/commentController");
const { protect } = require("../middleware/auth");

router.post("/:vibeId/comments", protect, createComment);
router.get("/:vibeId/comments", getCommentsForVibe);

module.exports = router;
