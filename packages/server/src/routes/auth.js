import { Router } from "express";
import passport from "passport";

const authRoute = Router();

authRoute.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  }),
);
authRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/graphql");
  },
);
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
authRoute.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000");
  },
);

export default authRoute;
