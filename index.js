const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Basic test route
app.get("/", (req, res) => {
  res.send("✅ Server is working");
});

// Chatbot message handler
app.post("/api/message", async (req, res) => {
  const { userName, message } = req.body;

  const prompt = `
You are WelcoMate, a friendly AI assistant on a website for Airbnb hosts.
The user's name is ${userName}.
They asked: "${message}"
Respond helpfully, warmly, and professionally.
`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // use GPT-4 only if your key supports it
      messages: [{ role: "user", content: prompt }],
    });

    const reply = chat.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error("❌ OpenAI error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`🟢 WelcoMate backend running on http://localhost:${port}`);
});

