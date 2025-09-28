// Middleware/authentication.js
import pkg from "express-openid-connect";
const { auth } = pkg;
import "dotenv/config";

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

  // 🔑 CRITICAL FIX: Add the session configuration block
  session: {
    // This tells express-openid-connect how to configure the session cookie

    cookie: {
      // 1. MUST BE true in your deployed environment (HTTPS)
      // This works with your 'app.set("trust proxy", 1);'
      secure: true,

      // 2. Allows the cookie to be sent during the cross-site redirect (callback)
      // 'Lax' is the recommended setting for IdP redirects.
      sameSite: "Lax",

      // Optional: If your frontend and backend are on different subdomains (e.g., api.domain.com and app.domain.com)
      // domain: 'your-main-domain.com'
    },
    // The secret is already defined at the top level, but you can override
    // it here if needed.
  },
};

export default auth(config);
