<template>
  <div class="movie-info">
    <h3>{{ movie.title }}</h3>
    <h4>{{ movie.tagline }}</h4>
    <p>{{ movie.rating }}</p>
    <p>{{ handleRuntime(movie.runtime) }} ({{ movie.runtime }}분)</p>
    <p>
      <span v-if="movie.genres">
        {{ movie.genres.map((g) => g.name).join(", ") }}
      </span>
      <span v-else-if="movie.genre_ids">
        {{ movie.genre_ids.map((id) => genres[id]).join(", ") }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "MovieInfo",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    genres: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleRuntime(runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}시간 ${minutes}분`;
    },
  },
};
</script>
