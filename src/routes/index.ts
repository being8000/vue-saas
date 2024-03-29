import { createRouter, createWebHistory } from "vue-router";
// 1. Define route components.
// These can be imported from other files
import SaaSRenderer from "@/views/sass.vue";
import Contenteditable from "@/views/contenteditable.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", redirect: "/saas" },
  { path: "/saas", component: SaaSRenderer },
  { path: "/slate", component: Contenteditable },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const Router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

// Now the app has started!
