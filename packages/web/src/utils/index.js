import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getRelativeTimePosted = timeCreated =>
  dayjs().to(dayjs(timeCreated));
