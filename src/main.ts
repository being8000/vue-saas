import { createApp } from "vue";
import "virtual:uno.css";
import "primevue/resources/themes/soho-light/theme.css";
import "./style.css";
import PrimeVue from "primevue/config";
import App from "./App.vue";

import SaaSPlugin from "@/plugins/sass";

const app = createApp(App);
app.use(SaaSPlugin, {
  a: 1,
});
app.use(PrimeVue);
app.mount("#app");
