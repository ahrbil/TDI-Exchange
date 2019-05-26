import prisma from "../../prisma";
import { questionPayload } from "../../fragments";
import pubSub, { NEW_NOTIFICATION } from "../../subscriptions";

const processSendNotifications = async ({ questionId, currentUserId }) => {
  // get question
  const questionInfo = await prisma
    .question({ id: questionId })
    .$fragment(questionPayload);
  // if the owner of the answer and the question are the same return
  if (currentUserId === questionInfo.askedBy.id) {
    return;
  }
  const { askedBy, ...payload } = questionInfo;
  // create notification
  const newNotification = await prisma.createNotification({
    action: "ANSWERED",
    actors: { connect: [{ id: currentUserId }] },
    notifier: { connect: { id: askedBy.id } },
    payload: JSON.stringify(payload)
  });
  // publish the new notification for subscribed user
  pubSub.publish(NEW_NOTIFICATION, {
    notifierId: askedBy.id,
    newNotification
  });
};
export default processSendNotifications;
