import {
  ChildContainer,
  Root,
  RootContainer,
  RootContainerProps,
} from "@/components/SaaS/Components/index";
import { Component as VueComponent } from "vue";
import { Field } from "./component-props";
export interface ComponentItem {
  component: VueComponent;
  propsComponent?: VueComponent; // 属性控制组件，用于编辑组件属性值
  componentName: string;
  props?: Field[];
}
export type RegisteredComponents = Record<string, ComponentItem>;

export type RegisteredComponentsKey = keyof RegisteredComponents;

class SaaSVueComponents {
  private com: RegisteredComponents = {
    ChildContainer: {
      component: ChildContainer,
      componentName: "子容器节点",
    },
    Root: {
      component: Root,
      componentName: "根节点",
    },
    RootContainer: {
      component: RootContainer,
      componentName: "根节点容器",
      propsComponent: RootContainerProps,
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
