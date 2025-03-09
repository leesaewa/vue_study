<template>
  <div
    v-if="movie"
    class="movie-detail-list"
    :style="`background-image:url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`"
  >
    <h1>영화 상세 정보</h1>
    <a :href="movie.homepage" target="_blank" rel="noopener noreferrer"
      >홈페이지</a
    >

    <p>영화 ID: {{ route.params.id }}</p>
    <p>제목: {{ movie.title }}</p>
    <p>줄거리: {{ movie.overview }}</p>

    <!-- <img :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`" /> -->

    <p>감독 : {{ movie.director.name }}</p>
    <img
      v-if="movie.director && movie.director.profilePath"
      :src="`https://image.tmdb.org/t/p/w500${movie.director.profilePath}`"
      alt="감독 사진"
    />

    <ul v-if="movie.cast.length > 0" class="cast">
      <li v-for="(cast, castIndex) in movie.cast" :key="castIndex">
        <span>{{ cast.character }}</span>
        {{ cast.name }}
        <img
          :src="
            cast.profilePath
              ? `https://image.tmdb.org/t/p/original${cast.profilePath}`
              : require('@/assets/images/no-image.gif')
          "
          alt=""
        />
      </li>
    </ul>
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
        console.log(movieData);
      } catch (error) {
        console.error("영화 정보를 불러오는 중 오류 발생:", error);
      }
    });

    return { route, movie };
  },
};
</script>
