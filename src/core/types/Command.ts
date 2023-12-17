/**
 * 参照设计模式中的命令模式，试图通过结合命令模式来实现历史记录，撤回等功能
 */
import { Component, ConcreteComponent, sassApp } from "@/core/types/index";
import { Node, nodeFactory } from "./ComponentNode";
import { debounce } from "../utils";
const f = (f: any) => {
  f();
};
const df = debounce(f, 200);
export class CommandHistory {
  private history: Command[] = [];
  push(c: Command) {
    this.history.push(c);
  }

  pop() {
    return this.history.pop();
  }

  executeCommand(c: Command) {
    console.log("execute", c);
    if (c.execute()) {
      this.history.push(c);
    }
  }
  undo() {
    df(() => {
      const c = this.history.pop();
      c?.undo();
      console.log("undo", c);
    });
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

export class AddNeighborNodeCommand extends Command {
  node?: Node;
  constructor(com: Component) {
    super();
    this.component = com;
  }
  undo(): void {
    const com = sassApp.coms.find((el) => el.node.nodeId == this.node?.nodeId);
    if (com) {
      const command = new DeleteCommand(com);
      command.execute();
      // const parent = sassApp.findById(com.parentId);
      // if (parent) {
      //   parent.node.children = (parent.node.children as Node[]).filter(
      //     (el) => el["nodeId"] == this.node?.nodeId
      //   );
      //   sassApp.emitNodesUpdate(parent, parent.node.children);
      // }
    }
  }
  execute(): boolean {
    const com = this.component;
    if (com) {
      const parent = sassApp.findById(com.parentId);
      if (parent) {
        const node = nodeFactory.getEmptyContainer();
        this.node = node;
        console.log(node, parent.node.children);
        parent.node.children.push(node);
        sassApp.emitNodesUpdate(parent, parent.node.children);
      }
    }
    return true;
  }
}

export class CopyAndAppendCommand extends Command {
  constructor(com: Component, saveHistory: boolean = true) {
    super();
    this.saveHistory = saveHistory;
    this.component = com;
  }
  undo(): void {
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
    const command = new CopyAndAppendCommand(this.component);
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
      sassApp.coms.splice(index, 1);
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
