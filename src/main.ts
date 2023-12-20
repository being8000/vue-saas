import { createApp } from "vue";
import "virtual:uno.css";
import "primevue/resources/themes/soho-light/theme.css";
import "./style.css";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import { saasVueComponents } from "./core/register-component";
import ImageComponent from "@/components/SaaS/Components/Image.vue";
import Breadcrumb from "@/components/Test/Breadcrumb.vue";
import Carouel from "@/components/Test/Carouel.vue";
import Message from "@/components/Test/Message.vue";
saasVueComponents.components({
  ImageComponent: {
    componentName: "图片",
    component: ImageComponent,
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
const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
