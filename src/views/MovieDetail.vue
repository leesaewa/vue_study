<template>
  <main v-if="movie" class="movie-detail-list">
    <div
      class="movie-backdrop"
      :style="`background-image:url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`"
    ></div>
    <div class="movie-caption">
      <Title :summary="movie" />

      <div class="overview">
        <div class="overview-poster">
          <img
            v-if="movie.poster_path"
            :src="
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : require('@/assets/images/no-image.gif')
            "
            alt=""
          />
        </div>
        <div class="overview-desc">
          <MovieInfo :movie="movie" :genres="genres" />
          <div class="overview-flex">
            <DetailInfo :director="movie.director" :movie="movie" />
            <Cast v-if="movie.cast" :cast="movie.cast" />
          </div>
          <div>
            <h3>Storyline</h3>
            {{ movie.overview }}
          </div>
        </div>
      </div>

      <Trailer v-if="movie.videoKey" :videoKey="movie.videoKey" />
      <SimilarList :similarList="movie.similarMovies" />
    </div>
  </main>
  <div v-else>로딩 중...</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetails, getMovieGenres } from "@/api/tmdb";
import Title from "@/components/pages/detail/Title.vue";
import Cast from "@/components/pages/detail/Cast.vue";
import Trailer from "@/components/pages/detail/Trailer.vue";
import SimilarList from "@/components/pages/detail/SimilarList.vue";
import MovieInfo from "@/components/pages/detail/MovieInfo.vue";
import DetailInfo from "@/components/pages/detail/DetailInfo.vue";

export default {
  name: "MovieDetail",

  components: { Title, Cast, Trailer, SimilarList, MovieInfo, DetailInfo },

  setup() {
    const route = useRoute();
    const movie = ref(null);
    const genres = ref({});
    const rating = ref(null);

    onMounted(async () => {
      try {
        const movieData = await getMovieDetails(route.params.id);
        movieData.similarMovies = movieData.similarMovies || [];

        movie.value = movieData;
        console.log(movieData);
        rating.value = movieData.rating;

        const genreMap = await getMovieGenres();
        genres.value = genreMap;
      } catch (error) {
        console.error("영화 정보를 불러오는 중 오류 발생:", error);
      }
    });

    return { route, movie, genres, rating };
  },

  methods: {},
};
</script>
