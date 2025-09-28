// Middleware/authentication.js
import pkg from "express-openid-connect";
const { auth } = pkg;
import "dotenv/config";

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.AUTH0_SECRET,
//   baseURL: process.env.AUTH0_BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//   routes: {
//     postLogoutRedirect: process.env.FRONTEND_URL,
//   },
// };

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    postLogoutRedirect: process.env.FRONTEND_URL,
    callback: "/callback",
  },
  session: {
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  },
};
export default auth(config);
