<template>
  <div :class="['movie-list', extraName]">
    <ul>
      <li v-for="(movie, movieIndex) in movieList" :key="movieIndex">
        <router-link :to="`/movie/${movie.id}`">
          <span>{{ movie.release_date }}</span>
          <img
            :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
            alt=""
          />
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.overview }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MovieList",

  props: {
    movieList: {
      type: Array,
      default: () => {},
    },
    extraName: {
      type: String,
      default: "",
    },
  },
};
</script>
