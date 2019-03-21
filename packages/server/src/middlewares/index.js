import passport from "passport";
import { Router } from "express";
import cookieSession from "cookie-session";
import { IS_PROD } from "../constants";

const middleWare = Router();
middleWare.use(
  cookieSession({
    name: "tdi-cs",
    keys: [process.env.SESSION_SECRET],
    maxAge: 1000 * 60 * 60 * 24 * 7,
    domain: IS_PROD ? "tdi-exchange.now.sh" : "localhost",
    httpOnly: IS_PROD
  })
);

middleWare.use(passport.initialize());
middleWare.use(passport.session());

export default middleWare;
