import { AppStateAction, defaultAction } from "./app-state";
import {
  Component,
  PlainNode,
  SaaSComponent,
  SaasFakeComponent,
} from "./components";
import { CommandHistory } from "./history";

/**
 * 该类是SaaS应用的主类，实现各个功能的载体。返回应用程序实例
 */
export class SaaSApplication {
  component: Component = new SaasFakeComponent();
  selections: Component[] = []; // 存储选中的组件列表，为后续使用
  action: AppStateAction = defaultAction;
  activedComponent?: Component;
  focused: boolean = false; // 当前是否有节点被选中 , 暂时未用到
  history: CommandHistory = new CommandHistory();
  constructor() {}
  // 将PlainNode to Component 对象，递归遍历生成实例
  mount(data: PlainNode, parent?: Component, index?: number): Component {
    const params: Partial<Component> = {
      attrs: data.attrs,
      tag: data.tag,
    };
    if (parent) {
      params.level = parent.level + 1;
      params.pid = parent.uid;
      params.index = index || 0;
      params.parent = parent;
    } else {
      params.level = 1;
      params.pid = 0;
    }
    params.children = [];
    const instance = new SaaSComponent(params);
    if (data.children.length > 0) {
      const childrends = data.children.map((el, index) =>
        this.mount(el, instance, index)
      );
      instance.children = childrends;
    }
    this.component = instance;
    return instance;
  }
}

export const saasApp = new SaaSApplication();
