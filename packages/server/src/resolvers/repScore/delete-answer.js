import prisma from "../../prisma";
import updateRepScore from "./update-repscore";
import { DELETE_ANSWER } from "../../constants";
// import { prisma } from "../../generated/prisma-client";

const deleteAnswerRepScore = async (userId, answerId) => {
  // check if question creator !== answer creator
  // users can't get score deleting there answer
  // get first question from returned array
  const [question] = await prisma
    .questions({
      where: {
        answers_some: { id: answerId }
      }
    })
    .askedBy()
    .id();
  const questionOwnerId = question.askedBy.id;
  if (userId !== questionOwnerId) {
    // update user's score
    await updateRepScore(userId, DELETE_ANSWER);
  }
};
export default deleteAnswerRepScore;
