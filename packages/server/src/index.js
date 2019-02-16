import "@babel/polyfill";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import prisma from "./prisma";
import resolvers from "./resolvers";
import middleWare from "./middlewares";
import authRoute from "./routes/auth";
import initPassport from "./passport";
import typeDefs from "./typeDefs";
import { IS_PROD, PORT } from "./constants";

initPassport();

const app = express();

app.use(middleWare);
app.use("/auth", authRoute);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: { endpoint: "/api" },
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
  origin: IS_PROD ? "https://tdi-exchange.now.sh" : "http://localhost:3000",
  credentials: true
};

server.applyMiddleware({ app, cors: corsOptions, path: "/api" });

const port = PORT;
app.listen({ port }, () => {
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
});
