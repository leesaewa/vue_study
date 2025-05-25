<template>
  <div class="main-slider-wrap">
    <swiper
      ref="mainSwiper"
      :modules="modules"
      :slides-per-view="1"
      :thumbs="{ swiper: thumbsSwiper }"
      effect="fade"
      :fade-effect="{ crossFade: true }"
      class="main-swiper"
      @swiper="setMainSwiper"
    >
      <!--  :autoplay="{ delay: 5000, disableOnInteraction: false }" -->
      <swiper-slide
        v-for="(item, itemIndex) in filteredMovies"
        :key="itemIndex"
        class="main-slide"
      >
        <div class="main-slide-content">
          <img
            :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`"
            class="main-bg"
            alt=""
          />
          <div class="main-info">
            <h1 class="movie-title">{{ item.title }}</h1>
            <p class="sub-title">
              <GenreList :movie="item" :genres="genreMap" />
              <span class="release-date"
                >개봉일:
                {{
                  item.release_date ? item.release_date.replace(/-/g, ".") : ""
                }}</span
              >
            </p>
            <p class="overview">{{ item.overview }}</p>
            <div class="rating">
              <span
                v-for="n in Math.floor(item.vote_average / 2)"
                :key="n"
                class="star filled"
                >★</span
              >
              <span
                v-for="n in 5 - Math.floor(item.vote_average / 2)"
                :key="`empty-${n}`"
                class="star"
                >☆</span
              >
              <span class="imdb"
                >평점: {{ Math.floor(item.vote_average * 10) / 10 }}</span
              >
            </div>

            <div class="btn-wrap">
              <Button
                v-for="(btn, btnIndex) in btnList"
                :key="btnIndex"
                :text="btn.text"
                :class="btn.className"
                @click="moveDetail(item.id)"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="thumbs-container">
      <swiper
        ref="thumbsRef"
        :modules="modules"
        :slides-per-view="3"
        :watch-slides-progress="true"
        :centered-slides="true"
        :navigation="true"
        :slides-per-group="1"
        :loop="false"
        class="thumbs-swiper"
        @swiper="setThumbsSwiper"
      >
        <swiper-slide
          v-for="(item, itemIndex) in filteredMovies"
          :key="itemIndex"
          class="thumb-slide"
          @click="goToSlide(itemIndex)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w300${item.backdrop_path}`"
            alt=""
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Navigation, Thumbs, Autoplay, EffectFade } from "swiper/modules";
import { getNowPlaying, getMovieGenres } from "@/api/tmdb";
import GenreList from "@/components/common/GenreList.vue";
import Button from "@/components/common/Button.vue";

export default {
  name: "MainSlider",
  components: {
    GenreList,
    Button,
  },
  data() {
    return {
      nowPlaying: [],
      modules: [Navigation, Thumbs, Autoplay, EffectFade],
      thumbsSwiper: null,
      mainSwiper: null,
      currentSlideIndex: 0,
      genreMap: {},
      btnList: [
        { text: "More", className: "btn-more" },
        { text: "+", className: "btn-add" },
      ],
    };
  },

  async created() {
    try {
      const [movies, genres] = await Promise.all([
        getNowPlaying(),
        getMovieGenres(),
      ]);
      this.nowPlaying = movies;
      this.genreMap = genres;
      console.log(this.nowPlaying);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  computed: {
    filteredMovies() {
      return this.nowPlaying.filter(
        (movie) => movie.overview && movie.overview.trim() != ""
      );
    },
  },

  mounted() {
    // 초기 로딩 후 썸네일 슬라이더 위치 조정 및 활성화
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.thumbsSwiper && !this.thumbsSwiper.destroyed) {
          this.thumbsSwiper.updateSize();
          this.thumbsSwiper.updateSlides();
          this.thumbsSwiper.slideTo(0, 0);

          // 첫 번째 슬라이드를 활성화
          const firstSlide = document.querySelector(
            ".thumbs-swiper .swiper-slide"
          );
          if (firstSlide) {
            firstSlide.classList.add("swiper-slide-thumb-active");
          }
        }
      }, 100);
    });
  },

  methods: {
    setMainSwiper(swiper) {
      this.mainSwiper = swiper;

      // 메인 슬라이더 변경 시 썸네일 슬라이더도 업데이트
      swiper.on("slideChange", () => {
        this.currentSlideIndex = swiper.activeIndex;

        if (this.thumbsSwiper && !this.thumbsSwiper.destroyed) {
          this.thumbsSwiper.slideTo(this.currentSlideIndex);
        }
      });
    },

    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;

      // 네비게이션 설정 확인
      console.log("Navigation settings:", swiper.params.navigation);
      console.log("Slides per group:", swiper.params.slidesPerGroup);

      // 슬라이드 갭(건너뛰기) 체크용 현재 인덱스 저장
      let lastIndex = 0;

      // 슬라이드 변경 시 현재 슬라이드 인덱스 업데이트
      swiper.on("slideChange", () => {
        const currentIndex = swiper.activeIndex;
        console.log(`슬라이드 변경: ${lastIndex} -> ${currentIndex}`);
        lastIndex = currentIndex;

        this.currentSlideIndex = currentIndex;

        // 메인 슬라이더 업데이트
        if (this.mainSwiper && !this.mainSwiper.destroyed) {
          this.mainSwiper.slideTo(this.currentSlideIndex);
        }
      });

      // 초기 슬라이드 설정
      this.$nextTick(() => {
        if (this.filteredMovies.length > 0) {
          // 강제로 첫 번째 슬라이드로 이동
          swiper.slideTo(0, 0, false);
          if (this.mainSwiper) {
            this.mainSwiper.slideTo(0, 0, false);
          }

          // 네비게이션 버튼 이벤트 감시
          const nextBtn = document.querySelector(".swiper-button-next");
          const prevBtn = document.querySelector(".swiper-button-prev");

          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              console.log("네비게이션 다음 버튼 클릭");
              // 현재 인덱스 + 1로 명시적 이동
              const nextIndex = Math.min(
                this.currentSlideIndex + 1,
                this.filteredMovies.length - 1
              );
              this.goToSlide(nextIndex);
            });
          }

          if (prevBtn) {
            prevBtn.addEventListener("click", () => {
              console.log("네비게이션 이전 버튼 클릭");
              // 현재 인덱스 - 1로 명시적 이동
              const prevIndex = Math.max(this.currentSlideIndex - 1, 0);
              this.goToSlide(prevIndex);
            });
          }
        }
      });
    },

    // 메인 슬라이더 메서드
    goToSlide(index) {
      if (index === this.currentSlideIndex) return;

      console.log(`goToSlide: ${this.currentSlideIndex} -> ${index}`);
      this.currentSlideIndex = index;

      if (this.mainSwiper) {
        this.mainSwiper.slideTo(index, 300, false);
      }

      if (this.thumbsSwiper) {
        this.thumbsSwiper.slideTo(index, 300, false);
      }
    },

    moveDetail(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
  },
};
</script>
