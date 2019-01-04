import { AuthenticationError, UserInputError } from "apollo-server-express";

const Mutation = {
  createQuestion: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Login first!");
    }
    const header = args.header.trim();
    if (header.length < 10) {
      throw new UserInputError("too short");
    }
    const newQuestion = await context.prisma.createQuestion({
      header,
      body: args.body,
      askedBy: {
        connect: {
          id: context.user.id
        }
      }
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
      answeredTo: { connect: { id: args.questionId } }
    });
    return newAnswer;
  }
};

export default Mutation;
