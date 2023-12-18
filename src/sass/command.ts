/**
 * 参照设计模式中行为模式的命令模式，试图通过结合命令模式来实现历史记录，撤回等功能
 */

import { sassApp } from ".";
import { Component, ComponentType, SassComponent } from "./components";
import { Container } from "./container";

export interface Command {
  component: Component;
  execute(...[]): boolean;
  undo(): void;
}
export class SelectComponentCommand implements Command {
  component: Component;
  lastComponent?: Component;
  constructor(com: Component) {
    this.component = com;
  }
  undo(): void {}
  execute(): boolean {
    return false;
  }
}

export class AddChildCommand implements Command {
  component: Component;
  addedCom: Component = new SassComponent({});
  constructor(com: Component) {
    this.component = com;
  }
  undo(): void {
    const command = new DeleteCommand(this.addedCom);
    command.execute();
  }
  execute(): boolean {
    // 如果为自定义容器，无法添加子容器
    if (this.component.type == ComponentType.CustomComponent) {
      return false;
    }
    if (this.component.type == ComponentType.Root) {
      this.addedCom = Container.getRootContainer(this.component);
    } else if ((this.component.type = ComponentType.RootContainer)) {
      this.addedCom = Container.getChildContainer(this.component);
    }
    this.component.addChild(this.addedCom);
    return true;
  }
}

export class CopyCommand implements Command {
  component: Component;
  copyDom: Component = new SassComponent({});
  constructor(com: Component) {
    this.component = com;
  }
  undo(): void {
    const command = new DeleteCommand(this.copyDom);
    command.execute();
  }
  execute(): boolean {
    this.copyDom = this.component.clone();
    this.copyDom.parent = this.component.parent;
    this.copyDom.index = (this.component.parent?.children.length || 0) + 1;
    this.component.parent?.addChild(this.copyDom);
    return true;
  }
}

export class AddNeighborNodeCommand implements Command {
  component: Component;
  constructor(com: Component) {
    this.component = com;
  }
  undo(): void {}
  execute(): boolean {
    this.component.parent?.removeChild(this.component);
    return true;
  }
}

export class DeleteCommand implements Command {
  component: Component;
  constructor(com: Component) {
    this.component = com;
  }
  undo(): void {
    this.component.parent?.children.splice(
      this.component.index,
      0,
      this.component
    );
    this.component.parent?.sync();
    // 回退app的选中状态
  }
  execute(): boolean {
    this.component.parent?.removeChild(this.component);
    // // 清楚app的选中状态
    if (sassApp.activedComponent?.uid == this.component.uid) {
      sassApp.action.toggleSelect(this.component);
    }
    return true;
  }
}
