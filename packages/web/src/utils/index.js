import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { convertToRaw } from "draft-js";

dayjs.extend(relativeTime);

export const getRelativeTimePosted = timeCreated =>
  dayjs().to(dayjs(timeCreated));

export const saveEditorStateToRaw = state => {
  const stateToRaw = JSON.stringify(convertToRaw(state));
  return stateToRaw;
};

export const isValidEditorContent = state => {
  const currentContentLength = state.getPlainText().trim().length;
  if (currentContentLength === 0) {
    return "can't submit empty answer";
  }
  if (currentContentLength > 0 && currentContentLength < 20) {
    return "too short";
  }
  return "";
};
