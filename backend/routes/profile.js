import express from "express";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

const router = express.Router();

router.get("/", requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

export default router;
