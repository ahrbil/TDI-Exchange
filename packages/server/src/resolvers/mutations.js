import { AuthenticationError } from "apollo-server-express";

const Mutation = {
  createQuestion: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Login first!");
    }
    const newQuestion = await context.prisma.createQuestion({
      header: args.header,
      body: args.body,
      askedBy: {
        connect: {
          id: context.user.id,
        },
      },
    });
    return newQuestion;
  },
  createAnswer: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Login first!");
    }
    const newAnswer = await context.prisma.createAnswer({
      body: args.body,
      answeredBy: { connect: { id: context.user.id } },
      answeredTo: { connect: { id: args.questionId } },
    });
    return newAnswer;
  },
};

export default Mutation;
