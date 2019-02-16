import { Router } from "express";
import passport from "passport";

import { IS_PROD } from "../constants";

const authRoute = Router();
const redirectUrl = IS_PROD ? "/" : "http://localhost:3000";

authRoute.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);
authRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect(`${redirectUrl}`);
  }
);
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect(`${redirectUrl}`);
  }
);
export default authRoute;
