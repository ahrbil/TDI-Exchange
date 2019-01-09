import prisma from "../../prisma";
import updateRepScore from "./update-repscore";
import { FIRST_QUESTION, CREATE_QUESTION } from "../../constants";

const updateCreateQuestionRepScore = async userId => {
  // first question post
  const totalQuestions = await prisma
    .questionsConnection({ where: { askedBy: { id: userId } } })
    .aggregate()
    .count();
  if (totalQuestions === 1) {
    // this means its first question
    // we update there score +10
    updateRepScore(userId, FIRST_QUESTION);
  } else {
    // this means not first question
    updateRepScore(userId, CREATE_QUESTION);
  }
};

export default updateCreateQuestionRepScore;
