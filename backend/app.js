// OLD: const express = require("express");
import express from "express";

// OLD: const cors = require("cors");
import cors from "cors";

// OLD: require("dotenv").config();
import "dotenv/config";
import { getAiExplanation } from "./gemini-service.js";

const app = express();

// Middleware to parse JSON
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/gemini", async (req, res) => {
  try {
    const prompt = "Explain how AI works in a few words";
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
