import passport from "passport";
import { Router } from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

const middleWare = Router();
middleWare.use(
  cookieSession({
    keys: [process.env.SESSION_SECRET],
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }),
);

middleWare.use(passport.initialize());
middleWare.use(passport.session());

export default middleWare;
