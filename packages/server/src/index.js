import "@babel/polyfill";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";

import prisma from "./prisma";
import resolvers from "./resolvers";
import middleWare from "./middlewares";
import authRoute from "./routes/auth";
import initPassport from "./passport";
import typeDefs from "./typeDefs";
import { IS_PROD, PORT } from "./constants";
import { initEvents } from "./events";
import getUserIdFromReq from "./utils/getUserIdFromReq";

initPassport();

initEvents();

const app = express();

app.use(middleWare);
app.use("/auth", authRoute);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: { endpoint: "/api" },
  context: ({ req, connection }) => {
    if (connection) {
      return {
        prisma,
        ...connection.context
      };
    }
    return {
      req,
      prisma,
      user: req.user
    };
  },
  uploads: {
    maxFiles: 1,
    maxFileSize: 80000
  },
  subscriptions: {
    path: "/websocket",
    onConnect: async (_, webSocket) => {
      try {
        // get user id
        const id = await getUserIdFromReq(webSocket.upgradeReq);
        // if there is id fetch the current user
        const user = id && (await prisma.user({ id }));
        // return false if no user found to prevent ws connection
        return user ? { user } : false;
      } catch (err) {
        // console.log(err);
      }
    }
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

// exposing the subscriptions
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
  console.log(`🚀 Ws ready at ${server.subscriptionsPath}`);
});
