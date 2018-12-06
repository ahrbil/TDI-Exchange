import { AuthenticationError } from "apollo-server-express";

const Query = {
  hello: (parent, args, context) => {
    console.log({ "USER🐱‍🐱‍": context.user });
    return "hiiiii";
  },
  me: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Not authenticated");
    }
    const me = await context.prisma.user({ id: context.user.id });
    return me;
  },
  allQuestions: async (parent, args, context) => {
    const allQuestions = await context.prisma.questions();
    return allQuestions;
  },
};

export default Query;
