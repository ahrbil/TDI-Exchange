import { AuthenticationError, UserInputError } from "apollo-server-express";
import {
  updateCreateQuestionRepScore,
  updateCreateAnswerRepScore
} from "./repScore";
// import { prisma } from "../../generated/prisma-client";

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
    updateCreateQuestionRepScore(context.user.id);
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
    updateCreateAnswerRepScore(context.user.id, args.questionId);
    return newAnswer;
  },
  createTag: async (parent, args, context) => {
    const name = args.name.trim().toLowerCase();
    const exists = await context.prisma.$exists.tag({ name });
    if (!exists && name.length >= 2) {
      const newTag = await context.prisma.createTag({ name });
      return newTag;
    }
  }
};

export default Mutation;
