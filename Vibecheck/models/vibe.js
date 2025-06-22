const mongoose = require("mongoose");

const vibeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vibeText: { type: String, required: true },
    mood: String,
    song: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vibe", vibeSchema);
