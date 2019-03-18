import prisma from "../../prisma";
import updateRepScore from "./update-repscore";
import { DELETE_ANSWER } from "../../constants";

const deleteAnswerRepScore = async (userId, answerId) => {
  // check if question creator !== answer creator
  // users can't get score deleting there answer
  const answeredById = await prisma
    .answer({ id: answerId })
    .answeredBy()
    .id();
  if (userId !== answeredById) {
    // update user's score
    updateRepScore(userId, DELETE_ANSWER);
  }
};
export default deleteAnswerRepScore;
