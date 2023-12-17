/**
 * 参照设计模式中的命令模式，试图通过结合命令模式来实现历史记录，撤回等功能
 */

import { Component, SassComponent } from "./components";

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
    this.addedCom = new SassComponent({});
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
    this.copyDom = SassComponent.NEW({ ...this.component });
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
    // const command = new CopyAndAppendCommand(this.component);
    // command.execute();
  }
  execute(): boolean {
    this.component.parent?.removeChild(this.component);
    return true;
  }
}
