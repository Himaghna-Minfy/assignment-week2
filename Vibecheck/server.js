const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const errorHandler = require("./middleware/error");

dotenv.config();
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'app.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
app.get("/", (req, res) => res.send("🎧 Welcome to VibeCheck Social API"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/vibes", require("./routes/vibeRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/comments", require("./routes/commentRoutes"));

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server blasting off on port ${PORT}`));
