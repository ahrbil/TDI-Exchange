import { Router } from "express";
import passport from "passport";

import getRedirectUrl from "../middlewares/get-redirect-url";

const authRoute = Router();

authRoute.get(
  "/facebook",
  getRedirectUrl,
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);
authRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    const { redirectUrl } = req.session;
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  }
);

authRoute.get(
  "/google",
  getRedirectUrl,
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const { redirectUrl } = req.session;
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  }
);
export default authRoute;
