<template>
  <div class="genre-movie-list">
    <h2 class="genre-title">{{ genreName }} 영화</h2>
    <div class="movie-grid">
      <div
        v-for="movie in genreMovies"
        :key="movie.id"
        class="movie-card"
        @click="moveDetail(movie.id)"
      >
        <div class="poster-wrap">
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            :alt="movie.title"
            class="movie-poster"
          />
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <GenreList
              :genres="genres"
              :movie="movie"
              :isList="true"
              class="movie-genres"
            />
            <div class="movie-meta">
              <span class="release-date">{{
                formatDate(movie.release_date)
              }}</span>
              <div class="rating">
                <span class="rating-value">{{
                  Math.floor(movie.vote_average * 10) / 10
                }}</span>
                <span class="rating-icon">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenreList from "@/components/common/GenreList.vue";

export default {
  name: "GenreMovieList",
  components: {
    GenreList,
  },
  props: {
    genreId: {
      type: Number,
      required: true,
    },
    genreName: {
      type: String,
      required: true,
    },
    movies: {
      type: Array,
      required: true,
    },
    genres: {
      type: Object,
      required: true,
    },
  },
  computed: {
    genreMovies() {
      // 해당 장르에 속한 영화만 필터링
      return this.movies.filter((movie) => {
        if (!movie.genre_ids) return false;
        return movie.genre_ids.includes(this.genreId);
      });
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      return dateString.replace(/-/g, ".");
    },
    moveDetail(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
  },
};
</script>

<style scoped>
.genre-movie-list {
  margin: 40px 0;
  padding: 0 20px;
}

.genre-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.movie-card:hover {
  transform: translateY(-5px);
}

.poster-wrap {
  position: relative;
  width: 100%;
  padding-top: 150%; /* 2:3 비율 */
}

.movie-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.movie-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-genres {
  margin-bottom: 8px;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.release-date {
  color: #ccc;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-value {
  font-weight: bold;
}

.rating-icon {
  color: #ffd700;
}

/* GenreList 스타일 오버라이드 */
:deep(.movie-genre) {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

:deep(.movie-genre li) {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
