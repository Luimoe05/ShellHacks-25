import express from "express";
import cors from "cors";
import "dotenv/config";
import { getAiExplanation } from "./gemini-service.js";

const app = express();

// CORS + JSON

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// Middleware
import authMiddleware from "./Middleware/authentication.js";
app.use(authMiddleware);

// Homepage

app.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // Create URL with user data for React
    const userData = {
      name: req.oidc.user.name,
      email: req.oidc.user.email,
      picture: req.oidc.user.picture,
      sub: req.oidc.user.sub,
    };
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    res.redirect(
      `${process.env.FRONTEND_URL}?auth=true&user=${encodedUserData}`
    );
  } else {
    res.send(`Not logged in <a href="/login">Login</a>`);
  }
});

// Routes (only require once!)
import profileRoute from "./routes/profile.js";
import geminiRoute from "./routes/gemini.js";
import authRoute from "./routes/auth.js";

app.use("/gemini", geminiRoute);
app.use("/profile", profileRoute);
app.use("/auth", authRoute);

console.log("Routes registered!"); // Debug log

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
