import { App, ComponentOptions, defineAsyncComponent } from "vue";
import ImageComponent from "@/components/Test/Image.vue";
import Breadcrumb from "@/components/Test/Breadcrumb.vue";
import Carouel from "@/components/Test/Carouel.vue";
import Message from "@/components/Test/Message.vue";
import { saasVueComponents } from "@/core/register-component";
saasVueComponents.components({
  ImageComponent: {
    componentName: "图片",
    component: ImageComponent,
    propsComponent: defineAsyncComponent(
      () => import("@/components/Test/ImageProps.vue")
    ),
  },
  Breadcrumb: {
    componentName: "面包屑",
    component: Breadcrumb,
  },
  Carouel: {
    componentName: "轮播组件",
    component: Carouel,
  },
  Message: {
    componentName: "消息组件",
    component: Message,
  },
});
export default {
  install(app: App<Element>, options: any) {
    console.log(app, options);
    app.mixin({
      // updated() {
      //   console.log("updated");
      // },
      // created() {
      //   console.log("created");
      // },
      // ....
    } as ComponentOptions);
  },
};
