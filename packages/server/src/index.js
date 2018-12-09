import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";

import prisma from "./prisma";
import resolvers from "./resolvers";
import middleWare from "./middlewares";
import authRoute from "./routes/auth";
import initPassport from "./passport";

require("dotenv").config();

initPassport();

const app = express();

app.use(middleWare);
app.use("/auth", authRoute);

const server = new ApolloServer({
  typeDefs: importSchema(`${__dirname}/schema.graphql`),
  resolvers,
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
  context: ({ req }) => ({
    req,
    prisma,
    user: req.user,
  }),
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`),
);
