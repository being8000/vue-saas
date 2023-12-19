import {
  autoIncreaseID,
  Component,
  ComponentType,
  PlainNode,
  SaaSComponent,
} from "./components";
/**
 * 用来编写一些公用 Component的操作方法
 */
export const Container = {
  // 为PlainNode设置根Node
  rootNode(nodes: PlainNode[]) {
    return {
      tag: "Root",
      children: nodes,
    } as PlainNode;
  },
  // 获取空的根node树， 用于创建新的一个页面编辑器的时候
  initRoodNode() {
    return this.rootNode([
      {
        tag: "RootContainer",
        children: [],
      },
    ]);
  },
  getRoot() {
    const rootContainer = new SaaSComponent({
      level: 1,
      type: ComponentType.Root,
      tag: "Root",
      uid: autoIncreaseID(),
      pid: 0,
      parent: undefined,
    });
    return rootContainer;
  },
  getRootContainer(root: Component) {
    const rootContainer = new SaaSComponent({
      level: root.level + 1,
      type: ComponentType.RootContainer,
      tag: "RootContainer",
      uid: autoIncreaseID(),
      pid: root.uid,
      parent: root,
    });
    return rootContainer;
  },
  getChildContainer(parant: Component) {
    const childContainer = new SaaSComponent({
      level: parant.level + 1,
      type: ComponentType.ChildContainer,
      tag: "ChildContainer",
      uid: autoIncreaseID(),
      pid: parant.uid,
      parent: parant,
    });
    return childContainer;
  },
  getCustomComponents(name: string, parant?: Component) {
    const childContainer = new SaaSComponent({
      level: (parant?.level || 0) + 1,
      type: ComponentType.CustomComponent,
      tag: name,
      uid: autoIncreaseID(),
      pid: parant?.uid,
      parent: parant,
    });
    return childContainer;
  },
  isCoustomContainer(com: Component) {
    return !["ChildContainer", "Root", "RootContainer"].includes(com.tag);
  },
};
