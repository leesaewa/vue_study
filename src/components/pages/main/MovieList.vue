<template>
  <div :class="['movie-list', extraName]">
    <h2>{{ movieTitle }}</h2>

    <swiper
      :modules="modules"
      :space-between="10"
      :loop="movieList.length >= 5"
      :centered-slides="true"
      :pagination="{ type: 'progressbar' }"
      :navigation="true"
      :autoplay="{ delay: 2000, disableOnInteraction: false }"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
        },
        '768': {
          slidesPerView: 4,
        },
        '1024': {
          slidesPerView: 5,
        },
      }"
    >
      <swiper-slide
        v-for="(movie, movieIndex) in movieList"
        :key="movieIndex"
        class="slider-items"
      >
        <router-link :to="`/movie/${movie.id}`">
          <img
            :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
            alt=""
          />
          <h3>{{ movie.title }}</h3>
          <span>{{ movie.release_date }}</span>
          <GenreList :movie="movie" :genres="genreMap" :isList="true" />
          <p>{{ movie.overview }}</p>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getMovieGenres } from "@/api/tmdb";
import GenreList from "@/components/common/GenreList.vue";

export default {
  name: "MovieList",
  components: {
    GenreList,
  },
  props: {
    movieTitle: {
      type: String,
      default: "",
    },
    movieList: {
      type: Array,
      default: () => [],
    },
    extraName: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      genreMap: {},
      modules: [Navigation, Pagination, Autoplay],
    };
  },

  mounted() {
    getMovieGenres().then((data) => {
      this.genreMap = data;
    });
  },
};
</script>
