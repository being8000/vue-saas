// export type EventConfig<Events extends { eventName: string }> = {
//   [E in Events as E["eventName"]]: (data: Omit<E, "eventName">) => void;

import { Component } from "./components";

// };
export type AppEventParameters = {
  component: Component;
};

type SelectEvent = (params: AppEventParameters) => void;
type CancelSelectEvent = (params: Partial<AppEventParameters>) => void;
type LockEvent = (params: AppEventParameters) => void;

export interface EventMap {
  appSelect: SelectEvent;
  appCancelSelect: CancelSelectEvent;
  appLock: LockEvent;
}
export interface EventParametersMap {
  appSelect: AppEventParameters;
  appCancelSelect: AppEventParameters;
  appLock: AppEventParameters;
}
export type EventKey = keyof EventMap;

export interface Listener<T extends EventKey> {
  type: T;
  callback: (params: EventParametersMap[T]) => void;
}
