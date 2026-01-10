import { Events } from "./events";

export const DispatchMap: Record<string, string> = {
  READY: Events.ready,
  MESSAGE_CREATE: Events.messageCreate,
};
