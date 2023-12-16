import { createApp } from "vue";
import "./style.css";
import "virtual:uno.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import PrimeVue from "primevue/config";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
