import prisma from "../../prisma";
import updateRepScore from "./update-repscore";
import { CREATE_ANSWER } from "../../constants";

const updateCreateAnswerRepScore = async (userId, questionId) => {
  // check if question creator !== answer creator
  // users can't get score answering there questions
  const askedById = await prisma
    .question({ id: questionId })
    .askedBy()
    .id();
  if (userId !== askedById) {
    // update user's score
    updateRepScore(userId, CREATE_ANSWER);
  }
};
export default updateCreateAnswerRepScore;
