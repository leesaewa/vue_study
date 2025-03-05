<template>
  <MovieList :movieList="movieList" :extraName="'movie-popular'" />
</template>

<script>
import { getPopularMovies } from "@/api/tmdb";
import MovieList from "@/components/pages/main/MovieList.vue";

export default {
  name: "Main",

  components: {
    MovieList,
  },

  data() {
    return {
      movieList: [],
    };
  },

  async created() {
    this.movieList = await getPopularMovies();
    console.log(this.movieList);
  },
};
</script>
