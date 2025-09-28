import express from "express";
import multer from "multer";
import fs from "fs";
import { getAiExplanation } from "../gemini-service.js";
import supabase from "../DB/supabase.js";

const router = express.Router();

// Multer Configuration
const upload = multer({ dest: "uploads/" });

// Handle GET requests (text-only)
router.get("/", async (req, res) => {
  try {
    const userInput = req.query.text;
    const prompt = userInput || "Hello! How can I help you?";

    // console.log(`Received GET request with prompt: ${prompt}`);

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

router.get("/advice", async (req, res) => {
  try {
    // Get user data from query parameters or request body
    const userData = req.query.userData ? JSON.parse(req.query.userData) : null;

    if (!userData) {
      return res.status(400).json({ error: "User data is required" });
    }

    // Create a prompt for your AI service
    const prompt = `
      Generate personalized financial advice for a user with the following information:
      Name: ${userData.name || "User"}
      Location: ${userData.city || "Unknown"}, ${userData.country || "Unknown"}
      
      Provide 2-3 specific, actionable financial recommendations in a friendly tone.
      Keep it under 150 words.
    `;

    // Call your Gemini service (assuming you have getAiExplanation function)
    const aiResponse = await getAiExplanation(prompt);

    res.json({
      success: true,
      advice: aiResponse,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating AI advice:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate advice",
      message: "Please try again later",
    });
  }
});

// Handle POST requests - chat with history, file uploads, everything
router.post("/", upload.single("file"), async (req, res) => {
  let filePath = null;

  try {
    // console.log("=== GEMINI POST REQUEST DEBUG ===");
    // console.log("Body:", req.body);
    // console.log("File:", req.file ? "File present" : "No file");
    // console.log("================================");

    // CHAT MODE: Detect chat request (has user_id and current_message)
    if (req.body.user_id && req.body.current_message) {
      const { user_id, current_message, conversation_history } = req.body;

      // console.log(`Chat Mode - User ${user_id} sent: ${current_message}`);
      // console.log(
      //   `Conversation history length: ${conversation_history?.length || 0}`
      // );

      // Build context-aware prompt
      let contextPrompt = current_message;

      if (conversation_history && conversation_history.length > 0) {
        // Include recent conversation history (last 10 messages to avoid token limits)
        const recentHistory = conversation_history.slice(-10);
        const context = recentHistory
          .map((msg) => `${msg.role}: ${msg.content}`)
          .join("\n");

        contextPrompt = `Previous conversation context:\n${context}\n\nCurrent user message: ${current_message}\n\nPlease respond naturally, considering the conversation context.`;
      }

      // console.log("Sending to Gemini with context...");
      const explanation = await getAiExplanation(contextPrompt);
      // console.log("Received response from Gemini");

      res.json({
        success: true,
        explanation: explanation,
        message_count: conversation_history?.length || 0,
      });
    }
    // FILE UPLOAD MODE: Detect file upload request (has text field or file)
    else if (req.body.text || req.file) {
      const userInput = req.body.text;
      const prompt = userInput || "Analyze the provided document.";

      // console.log(`File Mode - Received POST request with prompt: ${prompt}`);

      if (req.file) {
        filePath = req.file.path;
        // console.log(`Received file at temporary path: ${filePath}`);
      }

      const explanation = await getAiExplanation(prompt, filePath);

      res.json({ success: true, explanation: explanation });
    }
    // ERROR: Unknown request format
    else {
      console.error("Unknown request format:", req.body);
      res.status(400).json({
        success: false,
        message:
          "Invalid request format. Expected chat data (user_id, current_message) or file data (text, file).",
      });
    }
  } catch (error) {
    console.error("POST Route Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // Cleanup file if it exists
    if (filePath) {
      try {
        await fs.promises.unlink(filePath);
      } catch (e) {
        console.warn(`Fallback cleanup failed for ${filePath}: ${e.message}`);
      }
    }
  }
});

// Save entire conversation to database
router.post("/save-conversation", async (req, res) => {
  try {
    // console.log("Save conversation request body:", req.body);

    const { user_id, conversation } = req.body;

    if (!user_id) {
      console.error("Missing user_id in request");
      return res.status(400).json({
        success: false,
        message: "Missing user_id",
      });
    }

    if (!conversation || conversation.length === 0) {
      console.error("Missing or empty conversation");
      return res.status(400).json({
        success: false,
        message: "Missing or empty conversation",
      });
    }

    // console.log(
    //   `Saving conversation for user ${user_id} with ${conversation.length} messages`
    // );

    // Create a conversation summary for the title
    const firstUserMessage =
      conversation.find((msg) => msg.role === "user")?.content ||
      "New conversation";
    const title =
      firstUserMessage.length > 50
        ? firstUserMessage.substring(0, 50) + "..."
        : firstUserMessage;

    // Save conversation as a single record
    const { data, error } = await supabase
      .from("conversations_and_messages")
      .insert([
        {
          auth0_id: user_id,
          parent_id: null,
          role: "conversation",
          content: JSON.stringify({
            title: title,
            messages: conversation,
            message_count: conversation.length,
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString(),
          }),
        },
      ])
      .select();

    if (error) throw error;

    // console.log("Conversation saved successfully:", data[0].id);

    res.json({
      success: true,
      conversation_id: data[0].id,
      message_count: conversation.length,
    });
  } catch (error) {
    console.error("Error saving conversation:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
