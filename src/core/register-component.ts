import {
  ChildContainer,
  Root,
  RootContainer,
} from "@/components/SaaS/Components/index";
import { Component as VueComponent } from "vue";
import { Field } from "./component-props";
export interface ComponentItem {
  com: VueComponent;
  componentName: string;
  props?: Field[];
}
export type RegisteredComponents = Record<string, ComponentItem>;

export type RegisteredComponentsKey = keyof RegisteredComponents;

class SaaSVueComponents {
  private com: RegisteredComponents = {
    ChildContainer: {
      com: ChildContainer,
      componentName: "子容器节点",
    },
    Root: {
      com: Root,
      componentName: "根节点",
    },
    RootContainer: {
      com: RootContainer,
      componentName: "根节点容器",
    },
  };
  constructor() {}

  component(name: string, component: ComponentItem) {
    this.com[name] = component;
  }
  components(components: RegisteredComponents) {
    Object.keys(components).forEach((name) => {
      this.com[name] = components[name];
    });
  }

  find(componentKey: string) {
    console.log(componentKey);
    if (!componentKey) {
      return;
    }
    const vueComponent = saasVueComponents.com[componentKey];
    if (!vueComponent) {
      throw new Error(
        "未找到当前组件，请确认组件名字是否正确且并且已经注册完毕"
      );
    }
    return vueComponent;
  }
}

export const saasVueComponents = new SaaSVueComponents();
