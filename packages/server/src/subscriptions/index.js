import { PubSub } from "apollo-server-express";

const pubSub = new PubSub();

// pubSub trigger
export const NEW_NOTIFICATION = "NEW_NOTIFICATION";

export default pubSub;
