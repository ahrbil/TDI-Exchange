import updateCreateQuestionRepScore from "./create-question";
import updateCreateAnswerRepScore from "./create-answer";
import updateDeleteQuestionRepScore from "./delete-question";
// update the user score
// this function will be called on every crud operator
// posting a question = 1 rep => delete = -1 rep
// posting an answer = 2 rep => delete = -2 rep
// posting a working answer = 10 => delete = -10 rep
// posting first question = 10 => delete = -10 rep

export {
  updateCreateQuestionRepScore,
  updateCreateAnswerRepScore,
  updateDeleteQuestionRepScore
};
