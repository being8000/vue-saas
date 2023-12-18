import {
  ChildContainer,
  Root,
  RootContainer,
} from "@/components/Sass/Components/index";
import {
  Component as VueComponent,
  reactive,
  ref,
  Ref,
  UnwrapNestedRefs,
} from "vue";
import { Container } from "./container";
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
  tag: VueComponent; // 组件名字
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

/**
 * 参照创建行模式中的 组合模式
 */
export class SassComponent implements Component {
  type: ComponentType;
  uid: number;
  pid: Component["uid"];
  tag: VueComponent;
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
    this.uid = autoIncreaseID();
    this.pid = com.pid || 0;
    this.level = com.level || 1;
    if (com.level == 1) {
      this.tag = Root;
      this.type = ComponentType.Root;
    } else if (com.level == 2) {
      this.tag = RootContainer;
      this.type = ComponentType.RootContainer;
    } else if (com.level == 3) {
      // 判断当前tag是否是ComponentType 数组中的 如果是则设置对应类型
      // 如果不是则设置类型为CustomComponent.
      if (Container.isCoustomContainer(com)) {
        this.type = ComponentType.CustomComponent;
        this.tag = com.tag;
      } else {
        this.type = ComponentType.ChildContainer;
        this.tag = ChildContainer;
      }
    } else {
      this.type = ComponentType.CustomComponent;
      this.tag = com.tag;
    }
    this.attrs = com.attrs || {};
    this.children = []; // 需要设置为空，否则会污染子元素
    this.selected = false;
    this.onFocusin = false;
    this.index = com.index || 0;
    this.refChildren = ref(null);
    this.refData = reactive({});
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
    return new SassComponent(this);
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
