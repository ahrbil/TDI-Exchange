import { ForbiddenError } from "apollo-server-express";

const QUESTION = "question";
const ANSWER = "answer";

const throwForbiddenError = () => {
  throw new ForbiddenError(
    `You don't have the right permissions for this action.`
  );
};

const havePermissionQuestion = async (context, id) => {
  const askedBy = await context.prisma.question({ id }).askedBy();
  const currentUser = context.user;
  if (askedBy.id === currentUser.id) {
    return true;
  }
  throwForbiddenError();
};
const havePermissionAnswer = async (context, id) => {
  const answeredBy = await context.prisma.answer({ id }).answeredBy();
  const currentUser = context.user;
  if (answeredBy.id === currentUser.id) {
    return true;
  }
  throwForbiddenError();
};

const isHavePermission = async (type, context, id) => {
  switch (type) {
    case QUESTION: {
      const havePermission = await havePermissionQuestion(context, id);
      return havePermission;
    }
    case ANSWER: {
      const havePermission = await havePermissionAnswer(context, id);
      return havePermission;
    }
    default:
      break;
  }
};
export default isHavePermission;
