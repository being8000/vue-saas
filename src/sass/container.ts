import {
  ChildContainer,
  Root,
  RootContainer,
} from "@/components/Sass/Components";
import { Component as VueComponent } from "vue";
import {
  autoIncreaseID,
  Component,
  ComponentType,
  PlainNode,
  SassComponent,
} from "./components";
/**
 * 用来编写一些公用 Component的操作方法
 */
export const Container = {
  // 为PlainNode设置根Node
  rootNode(nodes: PlainNode[]) {
    return {
      tag: Root,
      children: nodes,
    } as PlainNode;
  },
  // 获取空的根node树， 用于创建新的一个页面编辑器的时候
  initRoodNode() {
    return this.rootNode([
      {
        tag: RootContainer,
        children: [],
      },
    ]);
  },
  getRoot() {
    const rootContainer = new SassComponent({
      level: 1,
      type: ComponentType.Root,
      tag: Root,
      uid: autoIncreaseID(),
      pid: 0,
      parent: undefined,
    });
    return rootContainer;
  },
  getRootContainer(root: Component) {
    const rootContainer = new SassComponent({
      level: root.level + 1,
      type: ComponentType.RootContainer,
      tag: RootContainer,
      uid: autoIncreaseID(),
      pid: root.uid,
      parent: root,
    });
    return rootContainer;
  },
  getChildContainer(rootContainer: Component) {
    const childContainer = new SassComponent({
      level: rootContainer.level + 1,
      type: ComponentType.ChildContainer,
      tag: ChildContainer,
      uid: autoIncreaseID(),
      pid: rootContainer.uid,
      parent: rootContainer,
    });
    return childContainer;
  },
  isCoustomContainer(com: Component) {
    return !([ChildContainer, Root, RootContainer] as VueComponent[]).includes(
      com.tag
    );
  },
};
