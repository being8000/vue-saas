// export type EventConfig<Events extends { eventName: string }> = {
//   [E in Events as E["eventName"]]: (data: Omit<E, "eventName">) => void;

import { Component } from "./components";

// };
/**
 * 消息通信事件列表注册
 */
export type AppEventParameters = {
  component: Component;
};

type SelectEvent = (params: AppEventParameters) => void;
type CancelSelectEvent = (params: AppEventParameters) => void;
type LockEvent = (params: AppEventParameters) => void;

export interface EventMap {
  appSelect: SelectEvent;
  appCancelSelect: CancelSelectEvent;
  appLock: LockEvent;
}

// export type EventConfig<Events extends EventMap> = {
//   [E in Events as E["eventName"]]: (data: Omit<E, "eventName">) => void;
// }
export type EventKey = keyof EventMap;
export interface Listener<K extends EventKey> {
  type: K;
  callback(...params: Parameters<EventMap[K]>): void;
}
