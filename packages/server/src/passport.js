import passport from "passport";
import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";

import prisma from "../prisma";

const initPassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // search in database for that user in the cookie by their id
    // and return that user
    const user = await prisma.user({ id });
    done(null, user);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        // callback function
        // here you save the new user to database or retrieve it if exists
        // when done with founding or creating user return it to done() func
        // done(null, user)
        const currentUser = await prisma.user({ facebookId: profile.id });
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await prisma.createUser({
            facebookId: profile.id,
            userName: profile.displayName,
            avatar: profile.photos[0].value,
          });
          done(null, newUser);
        }
      },
    ),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await prisma.user({ googleId: profile.id });
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await prisma.createUser({
            googleId: profile.id,
            userName: profile.displayName,
            avatar: profile.photos[0].value,
          });
          done(null, newUser);
        }
      },
    ),
  );
};

export default initPassport;
