import express from "express";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;
import { getAiExplanation } from "../gemini-service.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const userInput = req.query.text;
    console.log(userInput);

    const prompt = userInput || "Explain in a sentence how LLM's work";

    console.log(`Sending the prompt to backend ${prompt}`);

    const explanation = await getAiExplanation(prompt);
    console.log(explanation);
    // Send the actual data back to the client
    res.json({ success: true, explanation: explanation });
  } catch (error) {
    // Error handling from the service layer
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
