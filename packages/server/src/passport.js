import passport from "passport";
import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";

import prisma from "./prisma";
import { getUserEmail } from "./utils";

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
        profileFields: ["id", "displayName", "photos", "email"]
      },
      async (accessToken, refreshToken, profile, done) => {
        // callback function
        // here you save the new user to database or retrieve it if exists
        // also if the user email existed before this means they signed with deferent provider so we combine their accounts
        // when done with founding or creating user return it to done() func
        // done(null, user)
        const currentUser = await prisma.user({ facebookId: profile.id });
        const userEmailFromProvider = getUserEmail(profile);
        if (currentUser) {
          done(null, currentUser);
          return currentUser;
        }
        if (!currentUser && userEmailFromProvider) {
          const upsertedUser = await prisma.upsertUser({
            where: {
              email: userEmailFromProvider
            },
            update: {
              facebookId: profile.id
            },
            create: {
              facebookId: profile.id,
              userName: profile.displayName,
              avatar: profile.photos[0].value,
              email: userEmailFromProvider
            }
          });
          done(null, upsertedUser);
          return upsertedUser;
        }
        // in case user don't have email in their facebook account
        // add user without email
        const newUser = await prisma.createUser({
          facebookId: profile.id,
          userName: profile.displayName,
          avatar: profile.photos[0].value,
          email: userEmailFromProvider
        });
        done(null, newUser);
        return newUser;
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await prisma.user({ googleId: profile.id });
        const userEmailFromProvider = getUserEmail(profile);
        if (currentUser) {
          done(null, currentUser);
          return currentUser;
        }
        if (!currentUser && userEmailFromProvider) {
          const upsertedUser = await prisma.upsertUser({
            where: {
              email: userEmailFromProvider
            },
            update: {
              googleId: profile.id
            },
            create: {
              googleId: profile.id,
              userName: profile.displayName,
              avatar: profile.photos[0].value,
              email: userEmailFromProvider
            }
          });
          done(null, upsertedUser);
          return upsertedUser;
        }
      }
    )
  );
};

export default initPassport;
