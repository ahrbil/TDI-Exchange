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
