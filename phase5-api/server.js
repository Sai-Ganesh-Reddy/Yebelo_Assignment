// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose
  .connect("mongodb://mongodb:27017/yebeloDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Define Schema
const messageSchema = new mongoose.Schema({
  content: String,
  timestamp: Date,
});
const ProcessedMessage = mongoose.model("ProcessedMessage", messageSchema);

// Routes
app.get("/", (req, res) => res.send("📡 Yebelo API is running"));
app.get("/messages", async (req, res) => {
  const messages = await ProcessedMessage.find().sort({ timestamp: -1 });
  res.json(messages);
});

// Start server
app.listen(PORT, () => console.log(`🚀 API running at http://localhost:${PORT}`));
