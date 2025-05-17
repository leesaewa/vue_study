<template>
  <div :class="['genre-list', { 'genre-list--items': isList }]">
    <template v-if="movieGenres && movieGenres.length > 0">
      <template v-if="isList">
        <ul class="movie-genre">
          <li
            v-for="(genre, index) in movieGenres"
            :key="index"
            :class="getGenreName(genre)"
          >
            {{ genre }}
          </li>
        </ul>
      </template>
      <template v-else>
        {{ movieGenres.join(", ") }}
      </template>
    </template>
    <span v-else>정보가 없습니다.</span>
  </div>
</template>

<script>
export default {
  name: "GenreList",
  props: {
    genres: {
      type: Object,
      default: () => ({}),
    },
    movie: {
      type: Object,
      required: true,
    },
    isList: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    movieGenres() {
      if (this.movie.genres) {
        return this.movie.genres.map((g) => g.name);
      } else if (this.movie.genre_ids) {
        return this.movie.genre_ids
          .map((id) => this.genres[id])
          .filter(Boolean);
      }
      return [];
    },
  },
  methods: {
    getGenreName(genre) {
      const genreNameMap = {
        드라마: "drama",
        로맨스: "romance",
        범죄: "crime",
        코미디: "comedy",
        액션: "action",
        스릴러: "thriller",
        SF: "sf",
        모험: "adventure",
        가족: "family",
        애니메이션: "animation",
        판타지: "fantasy",
        전쟁: "war",
        다큐멘터리: "documentary",
        공포: "horror",
        역사: "history",
        서부: "western",
      };
      return genreNameMap[genre] || "";
    },
  },
};
</script>
