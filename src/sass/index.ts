import { AddChildCommand, CopyCommand, DeleteCommand } from "./Command";
import { Component, PlainNode, SassComponent } from "./components";
import { CommandHistory } from "./history";

class SassApplication {
  data?: Component;
  history: CommandHistory = new CommandHistory();
  constructor() {}
  // 将存对象，递归遍历生成实例
  mount(data: PlainNode, parent?: Component, index?: number): Component {
    const instance = SassApplication.New(data);
    if (parent) {
      instance.level = (parent.level || 0) + 1;
      instance.ancestors = [...(parent.ancestors || []), parent.uid];
      instance.pid = parent.uid;
      instance.index = index || 0;
      instance.parent = parent;
    } else {
      instance.level = 0;
      instance.ancestors = [];
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
  delete(com: Component) {
    this.history.executeCommand(new DeleteCommand(com));
  }
  addChild(com: Component) {
    this.history.executeCommand(new AddChildCommand(com));
  }
  copy(com: Component) {
    this.history.executeCommand(new CopyCommand(com));
  }
}

export const sassApp = new SassApplication();
