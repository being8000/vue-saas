import {
  ChildContainer,
  Root,
  RootContainer,
} from "@/components/SaaS/Components/index";
import { Component as VueComponent } from "vue";
export type RegisteredComponents = Record<string, VueComponent>;

export type RegisteredComponentsKey = keyof RegisteredComponents;

class SaaSVueComponents {
  com: RegisteredComponents = {
    ChildContainer: ChildContainer,
    Root: Root,
    RootContainer: RootContainer,
  };
  constructor() {}

  component(name: string, component: VueComponent) {
    this.com[name] = component;
  }
  components(components: RegisteredComponents) {
    Object.keys(components).forEach((name) => {
      this.com[name] = components[name];
    });
  }
}

export const saasVueComponents = new SaaSVueComponents();
