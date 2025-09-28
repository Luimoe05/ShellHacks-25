import express from "express";
import cors from "cors";
import "dotenv/config";
// No change needed for this import: import { getAiExplanation } from "./gemini-service.js";

const app = express();

// CORS + JSON (No change)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// IMPORTANT: Do NOT use express.json() for routes handling file uploads
// because Multer needs the raw multipart/form-data.
// However, since we only use express.json() for non-file routes, we can keep it here,
// but ensure Multer is used first on the file upload route.
app.use(express.json());

// Middleware (No change)
import authMiddleware from "./Middleware/authentication.js";
app.use(authMiddleware);

// Homepage (No change)
app.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
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

// Routes (No change, just ensure geminiRoute points to the updated file)
import profileRoute from "./routes/profile.js";
import geminiRoute from "./routes/gemini.js"; // This file is now updated to handle POST
import authRoute from "./routes/auth.js";

app.use("/gemini", geminiRoute); // This will now handle the POST request
app.use("/profile", profileRoute);
app.use("/auth", authRoute);

console.log("Routes registered!");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
