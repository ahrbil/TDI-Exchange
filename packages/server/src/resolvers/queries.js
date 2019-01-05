import { AuthenticationError } from "apollo-server-express";

const Query = {
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
  question: async (parent, args, context) => {
    const singleQuestion = await context.prisma.question({ id: args.id });
    return singleQuestion;
  },
  questionsCount: async (parent, args, context) => {
    const total = await context.prisma
      .questionsConnection()
      .aggregate()
      .count();
    return total;
  }
};

export default Query;
