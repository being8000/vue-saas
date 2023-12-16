import { ComponentPublicInstance, ref, Ref } from "vue";
import {
  AddChildNodeCommand,
  Command,
  CommandHistory,
  DeleteCommand,
} from "./Command";
import { Node } from "./ComponentNode";

// enum ComponentType {
//   MainContainer = "1",
//   Block = "2",
//   Inline = "3",
//   Link = "4",
//   IMAGE = "5",
//   VueComponent = "6",
// }
// 观察者
export interface Component {
  parentId: number | string; // 父节点ID
  uid: number | string; // 节点ID
  level: number; // 当前组件的层级 0 为根节点
  index: number; // 记录当前组件在父组件数组中的索引，用于做复原操作
  command?: Command; // 关联命令实例，用户存储用户操作命令历史记录，做撤回操作
  // 用户绑定Vue组件方法，如$forceUpdate, 方便内部更新组件
  proxy?: ComponentPublicInstance | null;
  node: Node;
  children: Ref<any>;
  // remove(node: number): void;
}

export class ConcreteComponent implements Component {
  parentId: number | string = "";
  uid: number | string = "";
  level: number = 0;
  index: number = -1;
  command?: Command;
  node: Node;
  // 用户绑定Vue组件方法，如$forceUpdate, 方便内部更新组件
  proxy?: ComponentPublicInstance | null;
  // 通知vue组件 更新子节点
  children: Ref<any> = ref([]);
  constructor(node: Node) {
    this.node = node;
  }

  // remove(uid: number): void {
  //   this.getParent();
  // }
}

class SassApplication {
  coms: Component[];
  history: CommandHistory = new CommandHistory();
  constructor() {
    this.coms = [];
  }
  add(c: Component): void {
    let item = this.coms.find(
      (e) => e.uid == c.uid && c.parentId == e.parentId
    );
    if (!item) {
      this.coms.push(c);
    }
  }
  remove(c: Component): void {
    this.history.executeCommand(new DeleteCommand(c));
  }
  insert(c: Component | undefined): void {
    if (!c) {
      return;
    }
    this.history.executeCommand(new AddChildNodeCommand(c));
  }
  unmounted(c: Component) {
    this.coms = this.coms.filter((el) => el.uid != c.uid);
  }
  getChildren(): Component[] {
    throw new Error("Method not implemented.");
  }
  findById(uid: number | string) {
    const c = this.coms.find((el) => el.uid == uid);

    return c;
  }
  findLatestById(uid: number | string) {
    const c = this.coms.find((el) => el.uid == uid);
    if (c != undefined) {
      // 获取最新子节点，防止被污染
      const latestNode = this.getLatestChildrenNode(c.uid, c.node);
      c.node = latestNode;
    }
    return c;
  }
  getSameParentComponents(parentId: number | string): Component[] {
    return this.coms.filter((e) => e.parentId == parentId);
  }
  // 由于Node是树形形式存储在各个组件之中，所以当你对子组件修改的时候无法更新所有的父组件中的Node已存在的值
  // 这个方法用于根据Component 的 uid 去获取罪行的Node值并更新。
  getLatestChildrenNode(uid: string | number, node: Node): Node {
    const com = this.findById(uid);
    if (com) {
      node.attrs = node.attrs;
      node.tag = node.tag;
      const chidrendComponets = this.getSameParentComponents(com.uid);
      const nodeChildren = chidrendComponets.map((el) => {
        const node = this.getLatestChildrenNode(el.uid, el.node);
        el.node = node;
        return node;
      });
      node.children = nodeChildren;
    }
    return node;
  }

  // 全局更新Components中被污染的 node值
  updateComponentsTree() {
    const root = this.coms.find((el) => el.level == 1);
    if (root) {
      this.getLatestChildrenNode(root.uid, root.node);
    }
  }
  emitNodesUpdate(c: Component, nodes: Node[]) {
    // 更新虚拟components 中节点的
    // const index = this.coms.findIndex((el) => el.uid == c.uid);
    // this.coms[index].node.children = nodes;
    // 更新Vue子组件，触发更新
    c.children.value = nodes;
    // let children: Node[] = nodes
    // let currentCom = c
    // let parentIndex = this.coms.findIndex(el => el.parentId == currentCom.uid)
    // do {
    //   if(parent){
    //     const index = currentCom.index
    //     let node = parent.node.children as Node[]
    //     node[index]
    //     chi.splice(index, 1, children)
    //     parentIndex = this.coms.findIndex(el => el.parentId == c.uid)
    //   }
    // } while (parentIndex != -1)
  }
}

export const sassApp = new SassApplication();
