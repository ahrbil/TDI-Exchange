import { EventEmitters } from "../initEvents";
import { SEND_NOTIFICATION } from "../constants";

const emitSendNotification = args => {
  EventEmitters.emit(SEND_NOTIFICATION, args);
};
export default emitSendNotification;
