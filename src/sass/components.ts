import { reactive, ref, Ref, UnwrapNestedRefs } from "vue";

export enum ComponentType {
  Container = 0, // 容器，可以添加子容器
  CustomComponent = 1, // 自定义组件
}
// interface ComponentAttributes {
//   props: Record<string, any>;
//   class: Pick<HTMLAttributes, "class">;
//   style: Pick<HTMLAttributes, "style">;
// }
export type PlainNode = Pick<Component, "attrs" | "tag" | "type"> & {
  children: PlainNode[];
};
export type SComponentProps = {
  instance: Component;
};
export type RendererPannelProps = {
  data: PlainNode;
};

export type VueComponentData = {
  selected?: boolean;
  onfocusin?: boolean;
  hovering?: boolean;
};
export interface Component {
  type: ComponentType; //组件类型
  uid: number; // 组件ID
  pid: Component["uid"]; // 父组件ID
  tag: string; // 组件名字
  level: number;
  index: number;
  attrs?: Record<string, string | boolean | undefined>; // 组件属性
  children: Component[]; // 子组件
  selected?: boolean; // 是否被选中
  onFocusin?: boolean; // 是否有子元素被选中
  parent?: Component;
  refChildren: Ref<any>; // 绑定Vue组件中动态响应的变量，用于促发更新
  refData: UnwrapNestedRefs<VueComponentData>;
  clone(): Component;
  removeChild(c: Component): Component[] | undefined;
  appendChild(c: Component): Component[] | undefined;
  addChild(c: Component): Component[] | undefined;
  getChildById(uid: Component["uid"]): Component | undefined;
  setRefChildren(ref: Ref<any>): void;
  setRefData(ref: UnwrapNestedRefs<VueComponentData>): void;
  sync(): void;
  toggleSelect(): void;
}
export const autoIncreaseID = (function () {
  let id = 0;
  return function () {
    id++;
    return id;
  };
})();

export class SassComponent implements Component {
  type: ComponentType;
  uid: number;
  pid: Component["uid"];
  tag: string;
  level: number;
  index: number;
  attrs: Record<string, string | boolean | undefined>;
  children: Component[];
  selected?: boolean | undefined;
  onFocusin?: boolean | undefined;
  parent?: Component;
  refChildren: Ref<any> = ref(null); // 绑定Vue组件中动态响应的变量，用于促发更新
  refData: UnwrapNestedRefs<VueComponentData> = reactive({}); // 绑定Vue组件中动态响应的变量，用于促发更新
  constructor(com: Partial<Component>);
  constructor(com: Component) {
    this.type = com.type || ComponentType.Container;
    this.uid = autoIncreaseID();
    this.pid = com.pid || 0;
    this.tag = com.tag || "div";
    this.level = com.level || 1;
    this.attrs = com.attrs || {};
    this.children = com.children || [];
    this.selected = false;
    this.onFocusin = false;
    this.index = com.index || 0;
    this.refChildren = ref(null);
    this.refData = reactive({});
  }
  static NEW(com: Component) {
    const newCom = new SassComponent({});
    newCom.type = com.type || ComponentType.Container;
    newCom.uid = autoIncreaseID();
    newCom.pid = com.pid || 0;
    newCom.tag = com.tag || "div";
    newCom.level = com.level || 1;
    newCom.attrs = com.attrs || {};
    newCom.selected = false;
    newCom.onFocusin = false;
    newCom.index = com.index || 0;
    newCom.refChildren = ref(null);
    newCom.refData = reactive({});
    // 以上属性需要从重赋值，否则克隆的时候可能会被污染到
    if (com.children.length > 0) {
      newCom.children = com.children.map((el) => {
        el = el.clone();
        el.pid = newCom.uid;
        el.parent = newCom;
        return el;
      });
    }
    return newCom;
  }
  removeChild(c: Component): Component[] | undefined {
    if (c.parent) {
      c.parent.children.splice(c.index, 1);
      c.parent.sync();
    }
    return c.parent?.children;
  }
  addChild(c: Component): Component[] | undefined {
    c.level = this.level + 1;
    c.pid = this.uid;
    c.parent = this;
    c.index = this.children.length + 1;
    this.children.splice(c.index, 0, c);
    this.sync();
    return this.children;
  }
  // 没用到
  appendChild(c: Component): Component[] | undefined {
    if (c.parent) {
      let index = c.parent.children.length;
      c.parent.children.splice(index, 0, c.clone());
      c.parent.sync();
    }
    return c.parent?.children;
  }
  sync() {
    // 更新索引
    this.children.forEach((el, index) => {
      el.index = index;
    });
    this.refChildren.value = this.children;
  }
  clone(): Component {
    return SassComponent.NEW(this);
  }
  setRefChildren(ref: Ref<any>): void {
    this.refChildren = ref;
    console.log("set");
  }
  setRefData(ref: UnwrapNestedRefs<VueComponentData>): void {
    this.refData = ref;
  }
  getChildById(uid: Component["uid"]) {
    return this.children.find((el) => (el.uid = uid));
  }
  toggleSelect(): void {
    this.selected = !this.selected;
    this.refData.selected = this.selected;
  }
}
