import express from "express";
import cors from "cors";
import "dotenv/config";
import { getAiExplanation } from "./gemini-service.js";
import supabase from "./DB/supabase.js"; // Add this import

const app = express();

app.set("trust proxy", 1);

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

// Homepage route - PUT YOUR AUTHENTICATION LOGIC HERE
app.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    try {
      const user = req.oidc.user;

      // Check if user exists in UserInfo table
      const { data, error } = await supabase
        .from("UserInfo")
        .select("*")
        .eq("auth0_id", user.sub)
        .single();

      // Prepare user data for frontend
      const userData = {
        name: user.name,
        email: user.email,
        picture: user.picture,
        sub: user.sub,
      };
      const encodedUserData = encodeURIComponent(JSON.stringify(userData));

      if (error && error.code === "PGRST116") {
        // User not found in UserInfo - redirect to onboarding
        console.log("User not found in UserInfo, redirecting to onboarding");
        res.redirect(
          `${process.env.FRONTEND_URL}/onboarding?user=${encodedUserData}`
        );
      } else if (data) {
        // User exists in UserInfo - redirect to home
        console.log("User found in UserInfo, redirecting to home");
        res.redirect(
          `${process.env.FRONTEND_URL}?auth=true&user=${encodedUserData}`
        );
      } else if (error) {
        // Database error - log and redirect to onboarding as safe fallback
        console.error("Database error:", error);
        res.redirect(
          `${process.env.FRONTEND_URL}/onboarding?user=${encodedUserData}`
        );
      }
    } catch (error) {
      console.error("Error checking UserInfo:", error);
      // On error, redirect to onboarding with user data
      const userData = {
        name: req.oidc.user.name,
        email: req.oidc.user.email,
        picture: req.oidc.user.picture,
        sub: req.oidc.user.sub,
      };
      const encodedUserData = encodeURIComponent(JSON.stringify(userData));
      res.redirect(
        `${process.env.FRONTEND_URL}/onboarding?user=${encodedUserData}`
      );
    }
  } else {
    res.send(`Not logged in <a href="/login">Login</a>`);
  }
});

// Routes
import profileRoute from "./routes/profile.js";
import geminiRoute from "./routes/gemini.js";
import authRoute from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import conversationRoute from "./routes/conversation.js";
import onboardingRoutes from "./routes/onboarding.js";

app.use("/onboarding", onboardingRoutes);
app.use("/gemini", geminiRoute);
app.use("/profile", profileRoute);
app.use("/auth", authRoute);
app.use("/api/users", userRoutes);
app.use("/api/conversation", conversationRoute);

console.log("Routes registered!");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;