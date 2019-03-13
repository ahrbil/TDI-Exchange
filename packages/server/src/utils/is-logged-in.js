import { AuthenticationError } from "apollo-server-express";

const isLoggedIn = context => {
  if (!context.user) {
    throw new AuthenticationError("Please login first!");
  }
};

export default isLoggedIn;
