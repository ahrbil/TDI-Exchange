import { AuthenticationError, UserInputError } from "apollo-server-express";

import {
  updateCreateQuestionRepScore,
  updateCreateAnswerRepScore
} from "./repScore";
import { uploadImage } from "../utils";
import validationSchema from "../input-validation";
import throwListError from "../utils/format-list-error";
// import { prisma } from "../../generated/prisma-client";

const Mutation = {
  createQuestion: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Login first!");
    }
    const header = args.header.trim();
    if (header.length < 3) {
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
  },
  createInternship: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Login first!");
    }
    const { imgFile, ...rest } = args;
    const { createReadStream, mimetype } = await imgFile;
    try {
      await validationSchema.validate(rest, { abortEarly: false });
    } catch (errors) {
      throwListError(errors);
    }
    const { secure_url } = await uploadImage(createReadStream, mimetype).catch(
      err => {
        throw new UserInputError(
          "filed to upload image, please try a deferent image"
        );
      }
    );
    const newInternship = await context.prisma.createInternship({
      postedBy: { connect: { id: context.user.id } },
      avatar: secure_url,
      location: args.location,
      tags: { connect: args.tags },
      title: args.title,
      description: args.description
    });
    return newInternship;
  },
  logout: (parent, args, context) => {
    if (context.user) {
      context.req.logout();
      return true;
    }
    return false;
  }
};

export default Mutation;
