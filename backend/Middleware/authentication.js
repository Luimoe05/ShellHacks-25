// Middleware/authentication.js
import pkg from "express-openid-connect";
const { auth } = pkg;
import "dotenv/config";

// 1. Define the environment check
// This determines if the app is running in a secure (HTTPS) environment.
const isProduction = process.env.NODE_ENV === "production";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    postLogoutRedirect: process.env.FRONTEND_URL,
  },

  // 🔑 CRITICAL ADDITION: Session and Cookie Configuration
  session: {
    cookie: {
      // 2. Conditional secure flag: TRUE for production (HTTPS), FALSE for local (HTTP).
      secure: isProduction,

      // 3. SameSite setting: Necessary for cross-site redirects (login callback)
      sameSite: "Lax",
    },
  },
};

export default auth(config);
