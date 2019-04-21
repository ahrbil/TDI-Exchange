import prisma from "../../prisma";
import { questionPayload } from "../../fragments";

const processSendNotifications = async ({ questionId, currentUserId }) => {
  // 1 get question
  const questionInfo = await prisma
    .question({ id: questionId })
    .$fragment(questionPayload);
  // if the owner of the answer and the question are the same return
  if (currentUserId === questionInfo.askedBy.id) {
    return;
  }
  const { askedBy, ...payload } = questionInfo;
  await prisma.createNotification({
    action: "ANSWERED",
    actors: { connect: [{ id: currentUserId }] },
    notifier: { connect: { id: askedBy.id } },
    payload: JSON.stringify(payload)
  });
};
export default processSendNotifications;
