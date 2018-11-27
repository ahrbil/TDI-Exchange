import {
  ApolloServer,
  makeExecutableSchema,
  gql,
} from "apollo-server-express";
import express from "express";

// const createSchema = require("./utils");
const { readFileSync } = require("fs");
import resolvers  from "./resolvers";

const typeDefs = gql(readFileSync("./schema.graphql", "utf-8"));

const app = express();

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
