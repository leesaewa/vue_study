<template>
  <main>
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
    <MovieList
      :movieTitle="'개봉 예정작'"
      :movieList="upComing"
      :extraName="'movie-popular'"
    />
    <MovieList
      :movieTitle="'오늘 인기있는 영화'"
      :movieList="dayTrend"
      :extraName="'movie-popular'"
    />
    <MovieList
      :movieTitle="'이번주 인기있는 영화'"
      :movieList="weekTrend"
      :extraName="'movie-popular'"
    />
  </main>
</template>

<script>
import {
  getPopularMovies,
  getNowPlaying,
  getTopRated,
  getUpComing,
  getDayTrending,
  getWeekTrending,
} from "@/api/tmdb";
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
      upComing: [],
      dayTrend: [],
      weekTrend: [],
    };
  },

  async created() {
    this.movieList = await getPopularMovies();
    this.nowPlaying = await getNowPlaying();
    this.topLated = await getTopRated();
    this.upComing = await getUpComing();
    this.dayTrend = await getDayTrending();
    this.weekTrend = await getWeekTrending();
    // console.log("상영중", this.nowPlaying);
    // console.log("최고 평점", this.topLated);
    // console.log("개봉 예정작", this.upComing);
    console.log("24시간", this.dayTrend);
  },
};
</script>
