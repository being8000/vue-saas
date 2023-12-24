import { CSSProperties } from "vue";
import { Container } from "./container";
import { EeventManager } from "./event-manager";
import { ComponentItem, saasVueComponents } from "./register-component";
export enum ComponentType {
  Root = "Root", // 根节点， 只允许新增 RootContainer 层级为L1
  RootContainer = "RootContainer", // 根容器，层级为L2, 允许添加 子容器 "Container" 或者 设置为自定义组
  ChildContainer = "ChildContainer", // 子容器 层级为L3, 允许 添加一个自定义组件
  // 自定义组件 层级 可以为
  // L3：作为根容器的自定义组件
  // L4：作为子容器的自定义组件
  CustomComponent = -1,
}

// interface ComponentAttributes {
//   props: Record<string, any>;
//   class: Pick<HTMLAttributes, "class">;
//   style: Pick<HTMLAttributes, "style">;
// }
export type PlainNode = Pick<Component, "attrs" | "tag"> & {
  children: PlainNode[];
};

export type SComponentProps = {
  instance: Component;
};

export type VueComponentData = {
  selected?: boolean;
  onfocusin?: boolean;
  hovering?: boolean;
};

export type ComponentAttribute = {
  [x: string]: any;
  style?: CSSProperties;
  initData?: object;
};

export interface Component {
  type: ComponentType; //组件类型
  uid: number; // 组件ID
  pid: Component["uid"]; // 父组件ID
  tag: string; // 组件名字
  vueComponent?: ComponentItem;
  level: number;
  index: number;
  attrs?: ComponentAttribute; // 组件属性
  children: Component[]; // 子组件
  selected?: boolean; // 是否被选中
  hovering?: boolean; // 是否有子元素被选中
  parent: Component;
  onUpdated: (fn: (com: Component) => void) => void;
  clone(): Component;
  removeChild(c: Component): Component[] | undefined;
  addChild(c: Component): Component[] | undefined;
  updateAttr(attr: ComponentAttribute): void;
  syncChildren(): void;
  toggleSelect(): void;
  toggleHovering(): void;
  update(): void;
}
export const autoIncreaseID = (function () {
  let id = 0;
  return function () {
    id++;
    return id;
  };
})();
export class SaasFakeComponent implements Component {
  type: Component["type"] = ComponentType.Root;
  uid: Component["uid"] = -1;
  pid: Component["uid"] = -1;
  tag: Component["tag"] = "";
  vueComponent?: Component["vueComponent"];
  level: Component["level"] = -1;
  index: Component["index"] = -1;
  attrs?: Component["attrs"];
  children: Component[] = [];
  selected?: Component["selected"];
  hovering?: Component["hovering"];
  parent: Component;
  constructor(com?: Partial<Component>);
  constructor(com: Component) {
    this.parent = com;
  }
  clone(): Component {
    throw new Error("Method not implemented.");
  }
  removeChild(): Component[] | undefined {
    throw new Error("Method not implemented.");
  }
  addChild(): Component[] | undefined {
    throw new Error("Method not implemented.");
  }
  updateAttr(): void {}
  syncChildren(): void {}
  toggleSelect(): void {}
  toggleHovering(): void {}
  update(): void {}
  onUpdated(): void {}
}
/**
 * 参照创建行模式中的 组合模式
 */
export class SaaSComponent implements Component {
  type: Component["type"];
  uid: Component["uid"];
  pid: Component["uid"];
  tag: Component["tag"];
  vueComponent?: Component["vueComponent"];
  level: Component["level"];
  index: Component["index"];
  attrs?: Component["attrs"];
  events: EeventManager = new EeventManager();
  children: Component[];
  selected?: Component["selected"];
  hovering?: Component["hovering"];
  parent: Component;
  constructor(com: Partial<Component>);
  constructor(com: Component) {
    this.uid = autoIncreaseID();
    this.pid = com.pid || 0;
    this.level = com.level || 1;
    this.type = Container.getComponentType(com.tag);
    this.tag = com.tag;
    this.vueComponent = saasVueComponents.find(this.tag);
    this.attrs = com.attrs || {};
    this.children = []; // 需要设置为空，否则会污染子元素
    this.selected = false;
    this.hovering = false;
    this.index = com.index || 0;
    this.parent = com.parent;
    // 以上属性需要从重赋值，否则克隆的时候可能会被污染到
    if (com.children && com.children.length > 0) {
      this.children = com.children.map((el) => {
        el = el.clone();
        el.pid = this.uid;
        el.parent = this;
        return el;
      });
    }
  }
  onUpdated(fn: (com: Component) => void) {
    this.events.unsubscribe("componentUpdate", fn);
    this.events.subscribe("componentUpdate", fn);
  }
  update(): void {
    this.events.notify("componentUpdate", this);
  }
  removeChild(c: Component): Component[] | undefined {
    c.parent.children.splice(c.index, 1);
    c.parent.syncChildren();
    return c.parent?.children;
  }
  addChild(c: Component): Component[] | undefined {
    c.level = this.level + 1;
    c.pid = this.uid;
    c.parent = this;
    c.index = this.children.length + 1;
    this.children.splice(c.index, 0, c);
    this.syncChildren();
    return this.children;
  }
  syncChildren() {
    // 更新索引
    this.children.forEach((el, index) => {
      el.index = index;
    });
    this.update();
  }
  updateAttr(attr: ComponentAttribute): void {
    // 这里需要Json.stringify 来 深拷贝，要不然会影响到上一个组件
    this.attrs = JSON.parse(JSON.stringify({ ...this.attrs, ...attr }));
    this.update();
  }
  clone(): Component {
    return new SaaSComponent(this);
  }
  toggleSelect(): void {
    this.selected = !this.selected;
    this.update();
  }
  toggleHovering(): void {
    this.hovering = !this.hovering;
    this.update();
  }
}
