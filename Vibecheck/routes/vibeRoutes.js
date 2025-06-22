const express = require("express");
const router = express.Router();
const {
  getAllVibes,
  getSingleVibe,
  createVibe,
  toggleLike,
  deleteVibe,
  getFeed
} = require("../controllers/vibeController");
const { protect } = require("../middleware/auth");

router.route("/")
  .get(getAllVibes)
  .post(protect, createVibe);

router.route("/feed").get(protect, getFeed);
router.route("/:id").get(getSingleVibe).delete(protect, deleteVibe);
router.route("/:id/like").put(protect, toggleLike);

module.exports = router;
