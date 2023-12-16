/**
 * 本类用于创建对Node-系统主键的一些公用方法的封装
 */
import { HtmlTagDescriptor } from "vite";
export type Node = HtmlTagDescriptor & BaseNode;

interface BaseNode {
  id?: Symbol;
  dom?: HTMLElement;
  children: Node[];
  [key: string]: any;
}

export type RendererProps = {
  data: Node;
};
interface FactoryAPI {
  getEmptyContainer(): Node;
}
class NodeFactory implements FactoryAPI {
  getEmptyContainer(): Node {
    return {
      tag: "div",
      attrs: {},
      children: [],
    };
  }
}
export const nodeFactory = new NodeFactory();
