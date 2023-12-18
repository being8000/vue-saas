// export type EventConfig<Events extends { eventName: string }> = {
//   [E in Events as E["eventName"]]: (data: Omit<E, "eventName">) => void;

import { Component } from "./components";

// };
type SelectParameters = {
  component: Component;
};

type SelectEvent = (params: SelectParameters) => void;
type CancelSelectEvent = (params: Partial<SelectParameters>) => void;
type LockEvent = (params: SelectParameters) => void;

export interface EventMap {
  appSelect: SelectEvent;
  appCancelSelect: CancelSelectEvent;
  appLock: LockEvent;
}
export interface EventParametersMap {
  appSelect: SelectParameters;
  appCancelSelect: SelectParameters;
  appLock: SelectParameters;
}
export type EventKey = keyof EventMap;

export interface Listener<T extends EventKey> {
  type: T;
  callback: (params: EventParametersMap[T]) => void;
}
