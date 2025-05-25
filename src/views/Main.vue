<template>
  <main>
    <MainSlider />
    <div class="content-wrapper">
      <Tab :tabList="tabList" @select-tab="handleTabSelect" />

      <component
        :is="currentMovieList"
        :movieTitle="currentTabTitle"
        :movieList="currentMovieData"
        :extraName="'movie-popular'"
      />

      <div class="genre-sections">
        <GenreFilter
          :genres="genreMap"
          :selected-genres="selectedGenreIds"
          @update:selected-genres="updateSelectedGenres"
        />
        <div v-if="selectedGenreIds.length > 0" class="filtered-movies">
          <h2 class="filtered-title">{{ getFilteredTitle() }} 영화</h2>
          <div class="movie-grid">
            <div
              v-for="movie in filteredMovies"
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
                    :genres="genreMap"
                    :movie="movie"
                    :is-list="true"
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
      </div>
    </div>
  </main>
</template>

<script>
import {
  getNowPlaying,
  getTopRated,
  getUpComing,
  getDayTrending,
  getWeekTrending,
  getMovieGenres,
} from "@/api/tmdb";
import Tab from "@/components/common/Tab.vue";
import MainSlider from "@/components/pages/main/MainSlider.vue";
import MovieList from "@/components/pages/main/MovieList.vue";
import GenreList from "@/components/common/GenreList.vue";
import GenreFilter from "@/components/pages/main/GenreFilter.vue";

export default {
  name: "Main",

  components: {
    Tab,
    MainSlider,
    MovieList,
    GenreList,
    GenreFilter,
  },

  data() {
    return {
      tabList: [
        { text: "현재상영작", id: "nowPlaying" },
        { text: "최고평점", id: "topRated" },
        { text: "개봉예정작", id: "upComing" },
        { text: "오늘인기있는영화", id: "dayTrend" },
        { text: "이번주인기있는영화", id: "weekTrend" },
      ],
      nowPlaying: [],
      topLated: [],
      upComing: [],
      dayTrend: [],
      weekTrend: [],
      genreMap: {},
      selectedGenreIds: [],
      currentTab: "nowPlaying",
    };
  },

  computed: {
    currentMovieList() {
      return MovieList;
    },

    currentTabTitle() {
      const tab = this.tabList.find((tab) => tab.id === this.currentTab);
      return tab ? tab.text : "";
    },

    currentMovieData() {
      switch (this.currentTab) {
        case "nowPlaying":
          return this.nowPlaying;
        case "topRated":
          return this.topLated;
        case "upComing":
          return this.upComing;
        case "dayTrend":
          return this.dayTrend;
        case "weekTrend":
          return this.weekTrend;
        default:
          return this.nowPlaying;
      }
    },

    filteredMovies() {
      if (this.selectedGenreIds.length === 0) return [];

      return this.currentMovieData.filter((movie) => {
        if (!movie.genre_ids) return false;
        // 선택된 모든 장르를 포함하는 영화만 필터링
        return this.selectedGenreIds.every((genreId) =>
          movie.genre_ids.includes(genreId)
        );
      });
    },
  },

  methods: {
    handleTabSelect(tabId) {
      this.currentTab = tabId;
    },

    updateSelectedGenres(newGenres) {
      this.selectedGenreIds = newGenres;
    },

    getFilteredTitle() {
      return this.selectedGenreIds.map((id) => this.genreMap[id]).join(" + ");
    },

    formatDate(dateString) {
      if (!dateString) return "";
      return dateString.replace(/-/g, ".");
    },

    moveDetail(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
  },

  async created() {
    try {
      const [nowPlaying, topRated, upComing, dayTrend, weekTrend, genres] =
        await Promise.all([
          getNowPlaying(),
          getTopRated(),
          getUpComing(),
          getDayTrending(),
          getWeekTrending(),
          getMovieGenres(),
        ]);

      this.nowPlaying = nowPlaying;
      this.topLated = topRated;
      this.upComing = upComing;
      this.dayTrend = dayTrend;
      this.weekTrend = weekTrend;
      this.genreMap = genres;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.genre-sections {
  margin-top: 40px;
}

.filtered-movies {
  margin-top: 20px;
}

.filtered-title {
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
  padding-top: 150%;
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
