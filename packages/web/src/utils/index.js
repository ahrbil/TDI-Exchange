import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { convertToRaw } from "draft-js";

dayjs.extend(relativeTime);

export const getRelativeTimePosted = timeCreated =>
  dayjs().to(dayjs(timeCreated), true);

export const saveEditorStateToRaw = state => {
  const stateToRaw = JSON.stringify(convertToRaw(state));
  return stateToRaw;
};

export const isValidEditorContent = state => {
  const currentContentLength = state.getPlainText().trim().length;
  if (currentContentLength === 0) {
    return "can't submit empty answer";
  }
  if (currentContentLength > 0 && currentContentLength < 3) {
    return "too short, minimum length of 3 character";
  }
  return "";
};

export const isEditorEmpty = state => {
  const currentContentLength = state.getPlainText().trim().length;
  if (currentContentLength === 0) {
    return true;
  }
  return false;
};

export const formatError = error => {
  const formatedError = error.graphQLErrors[0].message;
  return formatedError;
};
