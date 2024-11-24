import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./index.css";

const app = createApp(App);

store.dispatch("loadTasks"); // Load tasks from localStorage or defaults

app.use(store).mount("#app");
