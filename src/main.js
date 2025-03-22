import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/style.scss";

import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const app = createApp(App);

// Swiper 전역 등록
register();

app.use(router);
app.mount("#app");
