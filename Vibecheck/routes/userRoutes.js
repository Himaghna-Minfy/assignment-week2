const express = require("express");
const router = express.Router();
const { followUser } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.post("/:id/follow", protect, followUser);

module.exports = router;
