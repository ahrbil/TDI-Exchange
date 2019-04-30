import { withFilter } from "apollo-server-express";

import pubSub, { NEW_NOTIFICATION } from "../subscriptions";

// we use withFilter function to only send the notification
// to question owner and not to all subscribers
// check https://www.apollographql.com/docs/apollo-server/features/subscriptions#subscription-filters

const Subscription = {
  newNotification: {
    subscribe: withFilter(
      () => pubSub.asyncIterator([NEW_NOTIFICATION]),
      (payload, vars, context, info) => {
        return context.user.id === payload.notifierId;
      }
    ),
    // we return the payload but all the notification fields gets resolved on its own
    resolve: async (payload, args, context) => {
      return payload;
    }
  }
};
export default Subscription;
