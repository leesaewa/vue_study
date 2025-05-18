<template>
  <Header />

  <router-view />

  <Footer />
</template>

<script>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // Swiper 기본 설정을 여기서 설정할 수 있습니다
    document.addEventListener("DOMContentLoaded", () => {
      // Swiper 전역 설정이 필요하다면 여기에 추가
    });
  },
};
</script>

<style>
/* 전역 Swiper 스타일 설정 */
.swiper-button-next,
.swiper-button-prev {
  color: #fff !important;
}

.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background-color: #3575ff !important;
}

/* 필요한 공통 스타일 추가 */
</style>
