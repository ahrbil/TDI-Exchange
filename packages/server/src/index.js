import express from "express";
import { ApolloServer } from "apollo-server-express";

import prisma from "./prisma";
import resolvers from "./resolvers";
import middleWare from "./middlewares";
import authRoute from "./routes/auth";
import initPassport from "./passport";
import typeDefs from "./typeDefs";

require("dotenv").config();

initPassport();

const app = express();

app.use(middleWare);
app.use("/auth", authRoute);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "request.credentials": "include"
    }
  },
  context: ({ req }) => ({
    req,
    prisma,
    user: req.user
  }),
  uploads: {
    maxFiles: 1,
    maxFileSize: 80000
  }
  // formating graphql errors to just throw errors list
  // containing error path and error message
  // formatError: ({ extensions: { exception } }) => exception.errors,
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

server.applyMiddleware({ app, cors: corsOptions });

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
);
