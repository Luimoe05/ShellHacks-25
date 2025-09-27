const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// CORS + JSON
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Middleware
const authMiddleware = require("./Middleware/authentication");
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
const profileRoute = require("./routes/profile.js");
app.use("/profile", profileRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
