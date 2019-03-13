import updateRepScore from "./update-repscore";
import { DELETE_CREATE_QUESTION } from "../../constants";

const updateDeleteQuestionRepScore = async userId => {
  await updateRepScore(userId, DELETE_CREATE_QUESTION);
};

export default updateDeleteQuestionRepScore;
