/**
 * 参照设计模式中的命令模式，试图通过结合命令模式来实现历史记录，撤回等功能
 */
import { Component, ConcreteComponent, sassApp } from "@/core/types/index";
import { nodeFactory } from "./ComponentNode";
export class CommandHistory {
  private history: Command[] = [];
  push(c: Command) {
    this.history.push(c);
  }

  pop() {
    return this.history.pop();
  }

  executeCommand(c: Command) {
    if (c.execute()) {
      this.history.push(c);
    }
    // 实时更新子Node防止被污染
    sassApp.updateComponentsTree();
  }
  undo() {
    const c = this.history.pop();
    c?.undo();
    // 实时更新子Node防止被污染
    sassApp.updateComponentsTree();
  }
}

export abstract class Command {
  protected component: Component = new ConcreteComponent(
    nodeFactory.getEmptyContainer()
  );
  protected saveHistory: boolean = true;
  abstract execute(...[]): boolean;
  abstract undo(): void;
}

export class AddChildNodeCommand extends Command {
  constructor(com: Component, saveHistory: boolean = true) {
    super();
    this.saveHistory = saveHistory;
    this.component = com;
  }
  undo(): void {
    const com = this.component;
    if (com) {
      const parent = sassApp.findById(com.parentId);
      if (parent) {
        parent.node.children.pop();
        sassApp.emitNodesUpdate(parent, parent.node.children);
      }
    }
  }
  execute(): boolean {
    const com = this.component;
    if (com) {
      const parent = sassApp.findById(com.parentId);
      if (parent) {
        parent.node.children.push(nodeFactory.getEmptyContainer());
        sassApp.emitNodesUpdate(parent, parent.node.children);
      }
    }
    return true;
  }
}

export class AddNeighborCommand extends Command {
  constructor(com: Component, saveHistory: boolean = true) {
    super();
    this.saveHistory = saveHistory;
    this.component = com;
  }
  undo(): void {
    console.log("undo", this.component);
    const command = new DeleteCommand(this.component);
    command.execute();
  }
  execute(): boolean {
    const parent = sassApp.findById(this.component.parentId);
    let neighborComponents = sassApp.getSameParentComponents(
      this.component.parentId
    );
    neighborComponents.splice(
      this.component.index >= 0
        ? this.component.index
        : neighborComponents.length,
      0,
      this.component
    );
    const neighborNodes = neighborComponents
      .sort((a, b) => a.index - b.index)
      .map((el) => el.node);
    if (parent) {
      sassApp.emitNodesUpdate(parent, neighborNodes);
    }
    return true;
  }
}

export class DeleteCommand extends Command {
  constructor(com: Component) {
    super();
    this.component = com;
  }
  undo(): void {
    console.log("undo", this.component);
    const command = new AddNeighborCommand(this.component);
    command.execute();
  }
  execute(): boolean {
    const c = this.component;
    // 跳过最外层元素的移除事件
    if (c.level == 1) {
      return false;
    }
    const index = sassApp.coms.findIndex((ele) => ele.uid == c.uid);
    if (index >= 0) {
      sassApp.coms = sassApp.coms.filter((el) => el.uid != c.uid);
      const parent = sassApp.findById(c.parentId);
      let neighborComponents = sassApp.getSameParentComponents(c.parentId);
      if (parent) {
        const nodes = neighborComponents
          .sort((a, b) => a.index - b.index)
          .map((e) => e.node);
        sassApp.emitNodesUpdate(parent, nodes);
      }
    }
    return true;
  }
}
