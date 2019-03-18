import { UserInputError } from "apollo-server-express";

import {
  updateCreateQuestionRepScore,
  updateCreateAnswerRepScore,
  updateDeleteQuestionRepScore,
  deleteAnswerRepScore
} from "./repScore";
import { uploadImage, isHavePermission } from "../utils";
import validationSchema from "../input-validation";
import throwListError from "../utils/format-list-error";
import isLoggedIn from "../utils/is-logged-in";
// import { prisma } from "../generated/prisma-client";

const Mutation = {
  createQuestion: async (parent, args, context) => {
    isLoggedIn(context);
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
    isLoggedIn(context);
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
    isLoggedIn(context);
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
  },
  // update question
  updateQuestion: async (parent, args, context) => {
    const { questionId, body } = args;
    const header = args.header.trim();
    isLoggedIn(context);
    if (header.length < 3) {
      throw new UserInputError("too short");
    }
    const canMakeAction = await isHavePermission(
      "question",
      context,
      questionId
    );
    if (canMakeAction) {
      const updatedQuestion = await context.prisma.updateQuestion({
        where: { id: questionId },
        data: { header, body }
      });
      return updatedQuestion;
    }
  },
  // delete question
  deleteQuestion: async (parent, args, context) => {
    isLoggedIn(context);
    const canMakeAction = await isHavePermission(
      "question",
      context,
      args.questionId
    );
    if (canMakeAction) {
      await context.prisma.deleteQuestion({ id: args.questionId });
      await updateDeleteQuestionRepScore(context.user.id);
      return true;
    }
    return false;
  },
  // update answer
  updateAnswer: async (parent, { answerId, body }, context) => {
    isLoggedIn(context);
    const canMakeAction = await isHavePermission("answer", context, answerId);
    if (canMakeAction) {
      const updatedAnswer = await context.prisma.updateAnswer({
        where: { id: answerId },
        data: { body }
      });
      return updatedAnswer;
    }
  },
  // delete answer
  deleteAnswer: async (parent, { answerId }, context) => {
    isLoggedIn(context);
    const canMakeAction = await isHavePermission("answer", context, answerId);
    if (canMakeAction) {
      await deleteAnswerRepScore(context.user.id, answerId);
      await context.prisma.deleteAnswer({
        id: answerId
      });
      return true;
    }
    return false;
  }
};

export default Mutation;
