type CombindKey = string | `Control+${string}` | `Control+Shift+${string}`;
type EventFunction = (e: KeyboardEvent) => void;
export class ShorcutsEvent {
  // 存储系统用户已按下的按键
  private keys: Set<string> = new Set();
  // 存储用户注册快捷键事件
  events: Record<CombindKey, EventFunction> = {};
  // 用于零时存储已触发的shortcut事件, 防止重复触发, 事件会在按键松开的时候从新绑定到 events 对象中
  emittedEvents: Record<CombindKey, EventFunction> = {};

  constructor() {}

  // 通过回调方法 将主实例传值给系统方法。
  private keydownEvent(that: ShorcutsEvent) {
    return (e: KeyboardEvent) => {
      that.keydown(e, that);
    };
  }

  private keyupEvent(that: ShorcutsEvent) {
    return (e: KeyboardEvent) => {
      that.keyup(e);
    };
  }

  private keydown(e: KeyboardEvent, that: ShorcutsEvent) {
    that.keys.add(e.key);
    const keys = [...this.keys].join("+");
    const eventsList = Object.keys(this.events);
    if (eventsList.includes(keys)) {
      this.emittedEvents[keys] = this.events[keys];
      this.events[keys](e);
      this.remove(keys);
      // 阻止出发系统原生shortcut快捷事件
      e.stopPropagation();
      e.preventDefault();
    }
  }
  private keyup(e: KeyboardEvent) {
    if (e.defaultPrevented) {
      return;
    }
    this.keys.delete(e.key);
    this.events = { ...this.events, ...this.emittedEvents };
    this.emittedEvents = {};
  }

  // 启用shotcuts 快捷键事件
  enable() {
    window.removeEventListener("keydown", this.keydownEvent(this));
    window.removeEventListener("keyup", this.keyupEvent(this));
    window.addEventListener("keydown", this.keydownEvent(this));
    window.addEventListener("keyup", this.keyupEvent(this));
  }

  // 关闭快捷键事件，使用场景 当用户没有聚焦主编辑器 应该禁用快捷键，避免影响到其他功能。
  disable() {
    window.removeEventListener("keydown", this.keydownEvent(this));
    window.removeEventListener("keyup", this.keyupEvent(this));
  }

  addEvent(key: CombindKey, event: EventFunction) {
    this.events[key] = event;
  }

  remove(key: CombindKey) {
    delete this.events[key];
  }
}
