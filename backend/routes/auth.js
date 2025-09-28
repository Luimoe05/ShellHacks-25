// routes/auth.js
import express from "express";

const router = express.Router();

// Auth status endpoint
router.get("/status", (req, res) => {
  try {
    console.log("Auth status route hit");
    console.log("req.oidc exists:", !!req.oidc);

    if (req.oidc && req.oidc.isAuthenticated()) {
      const auth0Id = req.oidc.user.sub;
      console.log("User is authenticated:", req.oidc.user.name);
      console.log("AUTH0 ID exists:", req.oidc.user.name);
      console.log("AUTH0 ID exists:", auth0Id);
      res.json({
        isAuthenticated: true,
        user: {
          name: req.oidc.user.name,
          email: req.oidc.user.email,
          picture: req.oidc.user.picture,
          sub: req.oidc.user.sub,
        },
      });
    } else {
      console.log("User is not authenticated");
      res.json({
        isAuthenticated: false,
        user: null,
      });
    }
  } catch (error) {
    console.error("Error in auth status route:", error);
    res.status(500).json({
      isAuthenticated: false,
      user: null,
      error: "Internal server error",
    });
  }
});

export default router;
