import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
console.log(2222, app);

app.use(ElementPlus);
app.mount("#app");
