<template>
  <div v-if="movie">
    <h1>영화 상세 정보</h1>
    <p>영화 ID: {{ route.params.id }}</p>
    <p>제목: {{ movie.title }}</p>

    <img :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`" />
  </div>
  <p v-else>로딩 중...</p>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetails } from "@/api/tmdb";

export default {
  name: "MovieDetail",
  setup() {
    const route = useRoute();
    const movie = ref(null);

    onMounted(async () => {
      try {
        const movieData = await getMovieDetails(route.params.id);
        movie.value = movieData;
      } catch (error) {
        console.error("영화 정보를 불러오는 중 오류 발생:", error);
      }
    });

    return { route, movie };
  },
};
</script>
