import { sassApp } from ".";
import {
  AddChildCommand,
  AddVueComponentCommand,
  CopyCommand,
  DeleteCommand,
} from "./command";
import { Component } from "./components";
import { appEvents } from "./event-manager";

/**
 * 行为模式中的状态模式
 */
// 用来控制 在不同状态下 主应用对应方法不同的操作, 可绑定默认事件
export abstract class AppStateAction {
  constructor() {}
  abstract delete(): void;
  abstract addChild(): void;
  abstract addVueComponentChild(name: string): void;
  abstract copy(): void;
  toggleSelect(com?: Component): void {
    if (!com) {
      com = sassApp.component;
    }
    com.toggleSelect();
    // 设置为选中状态
    sassApp.action = selectedAction;
    sassApp.activedComponent = com;
    appEvents.notify("appSelect", {
      component: com,
    });
  }
}

class DefaultStateAction extends AppStateAction {
  addVueComponentChild(): void {}
  toggleSelect(com?: Component): void {
    super.toggleSelect(com);
  }
  delete(): void {}
  addChild(): void {}
  copy(): void {}
}

class SelectedStateAction extends AppStateAction {
  constructor() {
    super();
  }
  addVueComponentChild(name: string): void {
    if (sassApp.activedComponent) {
      sassApp.history.executeCommand(
        new AddVueComponentCommand(sassApp.activedComponent, name)
      );
    }
  }
  // 取消选中
  toggleSelect(com?: Component): void {
    // 如果没有具体所要选中的组件，则默认执行选中ROOT 根节点
    if (!com) {
      com = sassApp.component;
    }
    sassApp.activedComponent?.toggleSelect();
    // 通知其他面板
    appEvents.notify("appCancelSelect", {
      component: com,
    });
    // 如果 选中的组件和已经激活的组件是同一个 就取消选中不执行一下操作
    if (sassApp.activedComponent?.uid == com?.uid) {
      sassApp.activedComponent = undefined;
      sassApp.action = defaultAction;
    } else {
      super.toggleSelect(com);
    }
  }
  delete(): void {
    if (sassApp.activedComponent) {
      sassApp.history.executeCommand(
        new DeleteCommand(sassApp.activedComponent)
      );
      sassApp.activedComponent = undefined;
    }
  }
  addChild(): void {
    if (sassApp.activedComponent) {
      sassApp.history.executeCommand(
        new AddChildCommand(sassApp.activedComponent)
      );
    }
  }
  copy(): void {
    if (sassApp.activedComponent) {
      sassApp.history.executeCommand(new CopyCommand(sassApp.activedComponent));
    }
  }
}
// 锁定状态
class LockedStateAction extends AppStateAction {
  addVueComponentChild(): void {}
  toggleSelect(): void {}
  delete(): void {}
  addChild(): void {}
  copy(): void {}
}

const selectedAction = new SelectedStateAction();
const lockedAction = new LockedStateAction();
const defaultAction = new DefaultStateAction();
export { defaultAction, lockedAction, selectedAction };
