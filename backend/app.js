import express from "express";
import cors from "cors";
import "dotenv/config";
import { getAiExplanation } from "./gemini-service.js";

const app = express();

// CORS + JSON
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Middleware
import authMiddleware from "./Middleware/authentication.js";
app.use(authMiddleware);

// Homepage
app.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.send(`Logged in as ${req.oidc.user.name} <a href="/logout">Logout</a>`);
  } else {
    res.send(`Not logged in <a href="/login">Login</a>`);
  }
});

// Routes (only require once!)
import profileRoute from "./routes/profile.js";
import geminiRoute from "./routes/gemini.js";

app.use("/gemini", geminiRoute);
app.use("/profile", profileRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
