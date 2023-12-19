import { createApp } from "vue";
import "virtual:uno.css";
import "primevue/resources/themes/soho-light/theme.css";
import "./style.css";
import PrimeVue from "primevue/config";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
