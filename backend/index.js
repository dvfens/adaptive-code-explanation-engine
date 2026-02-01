import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   OPENROUTER INIT
======================= */
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

console.log(
  "OpenRouter key loaded:",
  !!process.env.OPENROUTER_API_KEY
);

/* =======================
   HEALTH CHECK
======================= */
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

/* =======================
   EXPLAIN API
======================= */
app.post("/explain", async (req, res) => {
  try {
    const { code, mode } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ error: "Code is required" });
    }

    const modePrompts = {
      Student: "Explain the following code to a student using simple language.",
      "Senior Developer": "Explain the following code to a senior developer. Be concise and technical.",
      ELI5: "Explain the following code like I'm 5 years old using very simple words."
    };

   const completion = await openrouter.chat.completions.create({
  model: "nvidia/nemotron-3-nano-30b-a3b",
  messages: [
    {
      role: "system",
      content: mode === "ELI5"
        ? "You explain code to a 5-year-old using very simple words and short sentences. Do not repeat instructions. Just explain."
        : mode === "Student"
        ? "You explain code clearly to a student using simple language."
        : "You explain code to a senior developer in a concise and technical way."
    },
    {
      role: "user",
      content: `Explain this code:\n\n${code}`
    }
  ],
  temperature: 0.4
});

const explanation = completion.choices[0].message.content;
res.json({ explanation });

  } catch (err) {
    console.error("OpenRouter error FULL:", err);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

/* =======================
   SERVER START
======================= */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
