import { AddChildCommand, CopyCommand, DeleteCommand } from "./command";
import { Component, PlainNode, SassComponent } from "./components";
import { CommandHistory } from "./history";

class SassApplication {
  data?: Component;
  selections: Component[] = []; // 存储选中的组件列表，为后续使用
  activedComponent?: Component;
  focused: boolean = false; // 当前是否有节点被选中 , 暂时为用到
  history: CommandHistory = new CommandHistory();
  constructor() {}
  // 将存对象，递归遍历生成实例
  mount(data: PlainNode, parent?: Component, index?: number): Component {
    const instance = SassApplication.New(data);
    if (parent) {
      instance.level = (parent.level || 0) + 1;
      instance.pid = parent.uid;
      instance.index = index || 0;
      instance.parent = parent;
    } else {
      instance.level = 1;
      instance.pid = 0;
    }
    instance.children = [];
    if (data.children.length > 0) {
      const childrends = data.children.map((el, index) =>
        this.mount(el, instance, index)
      );
      instance.children = childrends;
    }
    this.data = instance;
    return instance;
  }

  static New(node: PlainNode): Component {
    const com = new SassComponent({});
    com.attrs = node.attrs || {};
    com.tag = node.tag;
    com.type = node.type;
    return com;
  }
  delete() {
    if (this.activedComponent) {
      this.history.executeCommand(new DeleteCommand(this.activedComponent));
    }
  }
  addChild() {
    if (this.activedComponent) {
      this.history.executeCommand(new AddChildCommand(this.activedComponent));
    }
  }
  copy() {
    if (this.activedComponent) {
      this.history.executeCommand(new CopyCommand(this.activedComponent));
    }
  }
  select(com: Component) {
    // 用样式获取 2 级选中或着2级含选中的Dom节点
    // 用来计算BoundingRect 用于 floatingbar的定位显示
    //TODO
    // const l2Selected = document.querySelector(
    //   ".sass-item:not(.L1):has(.selected), .sass-item:not(.L1).selected"
    // );

    if (this.activedComponent) {
      this.activedComponent.toggleSelect();
    }
    com.toggleSelect();
    this.activedComponent = com;
  }
}

export const sassApp = new SassApplication();
