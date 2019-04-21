import { EventEmitter } from "events";
import { SEND_NOTIFICATION } from "./constants";
import processSendNotifications from "./notifications/processSendNotifications";

const EventEmitters = new EventEmitter();

const initEvents = () => {
  EventEmitters.on(SEND_NOTIFICATION, args => {
    processSendNotifications(args);
  });
};

export default initEvents;
export { EventEmitters };
