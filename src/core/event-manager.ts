/**
 * 此功能用来管理 FloatingBar, 或其他 组件中与 主应用的 事件通信
 * 行为模式中的观察者模式
 */

import { EventKey, EventMap, Listener } from "./event-types";

export class EeventManager {
  listeners: Listener<EventKey>[] = [];
  constructor() {}

  subscribe<K extends EventKey>(eventType: K, callback: EventMap[K]) {
    this.listeners.push({
      type: eventType,
      callback,
    });
  }

  unsubscribe<K extends EventKey>(eventType: K, callback: EventMap[K]) {
    const index = this.listeners.findIndex(
      (el) => el.type == eventType && el.callback == callback
    );
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  notify<K extends EventKey>(eventType: K, data: Parameters<EventMap[K]>[0]) {
    this.listeners
      .filter((el) => el.type == eventType)
      .forEach((lis) => {
        lis.callback(data as any);
      });
  }
}
export const appEvents = new EeventManager();
