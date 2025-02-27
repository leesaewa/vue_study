<template>
  <ul>
    <li v-for="(movie, i) in movies" :key="i">
      <router-link :to="`/movie/${movie.id}`">
        <img
          :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
          alt=""
        />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { getPopularMovies } from "@/api/tmdb";

export default {
  name: "View",

  data() {
    return {
      movies: [],
    };
  },

  async created() {
    this.movies = await getPopularMovies();
    console.log(this.movies);
  },
};
</script>
