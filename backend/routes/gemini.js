import express from "express";
import multer from "multer";
import fs from "fs";
import { getAiExplanation } from "../gemini-service.js";

const router = express.Router();

// Multer Configuration
const upload = multer({ dest: "uploads/" });

// Handle GET requests (text-only) - for your old Gemini.jsx component
router.get("/", async (req, res) => {
  try {
    const userInput = req.query.text;
    const prompt = userInput || "Hello! How can I help you?";

    console.log(`Received GET request with prompt: ${prompt}`);

    // Call without file for text-only requests
    const explanation = await getAiExplanation(prompt, null);

    res.json({ success: true, explanation: explanation });
  } catch (error) {
    console.error("GET Route Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Handle POST requests with file uploads - for your new ChatContainer.jsx component
router.post("/", upload.single("file"), async (req, res) => {
  let filePath = null;

  try {
    const userInput = req.body.text;
    const prompt = userInput || "Analyze the provided document.";

    console.log(`Received POST request with prompt: ${prompt}`);

    if (req.file) {
      filePath = req.file.path;
      console.log(`Received file at temporary path: ${filePath}`);
    }

    const explanation = await getAiExplanation(prompt, filePath);

    res.json({ success: true, explanation: explanation });
  } catch (error) {
    console.error("POST Route Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // Cleanup file
    if (filePath) {
      try {
        await fs.promises.unlink(filePath);
      } catch (e) {
        console.warn(`Fallback cleanup failed for ${filePath}: ${e.message}`);
      }
    }
  }
});

export default router;
