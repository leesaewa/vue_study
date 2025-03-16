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
          <h3>{{ movie.title }}</h3>
          <p>영화 ID: {{ route.params.id }}</p>
          <p>{{ movie.rating }}</p>
          <p>
            runtime: {{ handleRuntime(movie.runtime) }} ({{ movie.runtime }}분)
          </p>
          <p>
            장르:
            <span v-if="movie.genres">
              {{ movie.genres.map((g) => g.name).join(", ") }}
            </span>
            <span v-else-if="movie.genre_ids">
              {{ movie.genre_ids.map((id) => genres[id]).join(", ") }}
            </span>
          </p>

          <p>감독 : {{ movie.director?.name }}</p>
          <img
            v-if="movie.director && movie.director.profilePath"
            :src="
              movie.director && movie.director.profilePath
                ? `https://image.tmdb.org/t/p/w500${movie.director.profilePath}`
                : require('@/assets/images/no-image.gif')
            "
            alt="감독 사진"
          />

          <Cast v-if="movie.cast" :cast="movie.cast" />
        </div>
      </div>

      {{ movie.overview }}

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

export default {
  name: "MovieDetail",

  components: { Title, Cast, Trailer, SimilarList },

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

  methods: {
    handleRuntime(runtime) {
      const hours = Math.floor(runtime / 60); // 시간을 계산 (124 ÷ 60 = 2시간)
      const minutes = runtime % 60; // 나머지 분을 계산 (124 % 60 = 4분)
      return `${hours}시간 ${minutes}분`;
    },
  },
};
</script>
