<template>
  <MovieList
    :movieTitle="'Popular'"
    :movieList="movieList"
    :extraName="'movie-popular'"
  />
  <MovieList
    :movieTitle="'지금 상영중'"
    :movieList="nowPlaying"
    :extraName="'movie-popular'"
  />
  <MovieList
    :movieTitle="'최고 평점'"
    :movieList="topLated"
    :extraName="'movie-popular'"
  />
</template>

<script>
import { getPopularMovies, getNowPlaying, getTopRated } from "@/api/tmdb";
import MovieList from "@/components/pages/main/MovieList.vue";

export default {
  name: "Main",

  components: {
    MovieList,
  },

  data() {
    return {
      movieList: [],
      nowPlaying: [],
      topLated: [],
    };
  },

  async created() {
    this.movieList = await getPopularMovies();
    this.nowPlaying = await getNowPlaying();
    this.topLated = await getTopRated();
    console.log("상영중", this.nowPlaying);
    console.log("최고 평점", this.topLated);
  },
};
</script>
