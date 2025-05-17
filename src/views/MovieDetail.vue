<template>
  <main v-if="movie" class="movie-detail-list">
    <div
      class="movie-backdrop"
      :style="`background-image:url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`"
    ></div>
    <div class="movie-contents">
      <Title :summary="movie" />
      <Overview :movie="movie" />
      <SimilarList :similarList="movie.similarMovies" />
    </div>
  </main>
  <div v-else>로딩 중...</div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetails, getMovieGenres } from "@/api/tmdb";
import Title from "@/components/pages/detail/Title.vue";
import Overview from "@/components/pages/detail/Overview.vue";
import SimilarList from "@/components/pages/detail/SimilarList.vue";

export default {
  name: "MovieDetail",

  components: { Title, Overview, SimilarList },

  setup() {
    const route = useRoute();
    const movie = ref(null);
    const genres = ref({});
    const rating = ref(null);

    const fetchMovieData = async (id) => {
      try {
        const movieData = await getMovieDetails(id);
        movieData.similarMovies = movieData.similarMovies || [];
        movie.value = movieData;
        rating.value = movieData.rating;
        console.log(movieData);
      } catch (error) {
        console.error("영화 정보를 불러오는 중 오류 발생:", error);
      }
    };

    onMounted(async () => {
      await fetchMovieData(route.params.id);
      const genreMap = await getMovieGenres();
      genres.value = genreMap;
    });

    watch(
      () => route.params.id,
      async (newId) => {
        movie.value = null; // 로딩 상태 표시
        await fetchMovieData(newId);
      }
    );

    return { route, movie, genres, rating };
  },
};
</script>
