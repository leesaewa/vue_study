import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/style.scss";

// Swiper 전역 등록
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const app = createApp(App);

// Swiper 전역 등록
register();
app.component("Swiper", Swiper);
app.component("SwiperSlide", SwiperSlide);

app.use(router);
app.mount("#app");
