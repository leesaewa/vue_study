<template>
  <div class="search-page">
    <div class="search-container">
      <h1>영화 검색</h1>

      <!-- 검색 조건 필드 -->
      <div class="search-fields">
        <!-- 영화 제목 -->
        <div class="field-group">
          <label>영화 제목</label>
          <input
            v-model="searchQuery.title"
            type="text"
            placeholder="영화 제목을 입력하세요"
          />
        </div>

        <!-- 배우 -->
        <div class="field-group">
          <label>배우</label>
          <div class="autocomplete-wrapper">
            <input
              v-model="actorSearch"
              type="text"
              placeholder="배우 이름을 입력하세요"
              @input="searchActors"
            />
            <div v-if="actorResults.length > 0" class="autocomplete-results">
              <div
                v-for="actor in actorResults"
                :key="actor.id"
                class="result-item"
                @click="selectActor(actor)"
              >
                {{ actor.name }}
              </div>
            </div>
          </div>
          <div v-if="selectedActors.length > 0" class="selected-items">
            <div
              v-for="actor in selectedActors"
              :key="actor.id"
              class="selected-item"
            >
              {{ actor.name }}
              <button @click="removeActor(actor)">×</button>
            </div>
          </div>
        </div>

        <!-- 감독 -->
        <div class="field-group">
          <label>감독</label>
          <div class="autocomplete-wrapper">
            <input
              v-model="directorSearch"
              type="text"
              placeholder="감독 이름을 입력하세요"
              @input="searchDirectors"
            />
            <div v-if="directorResults.length > 0" class="autocomplete-results">
              <div
                v-for="director in directorResults"
                :key="director.id"
                class="result-item"
                @click="selectDirector(director)"
              >
                {{ director.name }}
              </div>
            </div>
          </div>
          <div v-if="selectedDirectors.length > 0" class="selected-items">
            <div
              v-for="director in selectedDirectors"
              :key="director.id"
              class="selected-item"
            >
              {{ director.name }}
              <button @click="removeDirector(director)">×</button>
            </div>
          </div>
        </div>

        <!-- 컬렉션 -->
        <div class="field-group">
          <label>컬렉션</label>
          <div class="autocomplete-wrapper">
            <input
              v-model="collectionSearch"
              type="text"
              placeholder="컬렉션을 입력하세요"
              @input="searchCollections"
            />
            <div
              v-if="collectionResults.length > 0"
              class="autocomplete-results"
            >
              <div
                v-for="collection in collectionResults"
                :key="collection.id"
                class="result-item"
                @click="selectCollection(collection)"
              >
                {{ collection.name }}
              </div>
            </div>
          </div>
          <div v-if="selectedCollection" class="selected-items">
            <div class="selected-item">
              {{ selectedCollection.name }}
              <button @click="removeCollection">×</button>
            </div>
          </div>
        </div>

        <!-- 키워드 -->
        <div class="field-group">
          <label>키워드</label>
          <div class="autocomplete-wrapper">
            <input
              v-model="keywordSearch"
              type="text"
              placeholder="키워드를 입력하세요"
              @input="searchKeywords"
            />
            <div v-if="keywordResults.length > 0" class="autocomplete-results">
              <div
                v-for="keyword in keywordResults"
                :key="keyword.id"
                class="result-item"
                @click="selectKeyword(keyword)"
              >
                {{ keyword.name }}
              </div>
            </div>
          </div>
          <div v-if="selectedKeywords.length > 0" class="selected-items">
            <div
              v-for="keyword in selectedKeywords"
              :key="keyword.id"
              class="selected-item"
            >
              {{ keyword.name }}
              <button @click="removeKeyword(keyword)">×</button>
            </div>
          </div>
        </div>

        <!-- 장르 -->
        <div class="field-group">
          <label>장르</label>
          <select v-model="searchQuery.genres" multiple class="genre-select">
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </div>

        <!-- 출시 연도 -->
        <div class="field-group">
          <label>출시 연도</label>
          <div class="year-range">
            <input
              v-model.number="searchQuery.yearFrom"
              type="number"
              placeholder="시작 연도"
              min="1900"
              max="2024"
            />
            <span>~</span>
            <input
              v-model.number="searchQuery.yearTo"
              type="number"
              placeholder="종료 연도"
              min="1900"
              max="2024"
            />
          </div>
        </div>
      </div>

      <!-- 검색 버튼 -->
      <button class="search-button" @click="searchMovies">검색</button>

      <!-- 검색 결과 -->
      <div v-if="searchResults.length > 0" class="search-results">
        <div class="results-header">
          <h2>검색 결과</h2>
          <div class="sort-options">
            <select v-model="sortBy" @change="sortResults">
              <option value="popularity">인기순</option>
              <option value="release_date">최신순</option>
              <option value="vote_average">평점순</option>
            </select>
          </div>
        </div>
        <div class="movie-grid">
          <div
            v-for="movie in searchResults"
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

        <!-- 페이지네이션 -->
        <div class="pagination">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            이전
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  searchMovies,
  searchPeople,
  searchCollections,
  searchKeywords,
  getMovieGenres,
  discoverMovies,
} from "@/api/tmdb";

export default {
  name: "Search",

  data() {
    return {
      // 검색 쿼리
      searchQuery: {
        title: "",
        genres: [],
        yearFrom: null,
        yearTo: null,
        withPeople: [],
        withCrew: [],
        withCollections: [],
        withKeywords: [],
      },

      // 자동완성 검색
      actorSearch: "",
      directorSearch: "",
      collectionSearch: "",
      keywordSearch: "",

      // 검색 결과
      actorResults: [],
      directorResults: [],
      collectionResults: [],
      keywordResults: [],

      // 선택된 항목들
      selectedActors: [],
      selectedDirectors: [],
      selectedCollection: null,
      selectedKeywords: [],

      // 장르 목록
      genres: [],

      // 검색 결과
      searchResults: [],
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,

      // 디바운스 타이머
      searchTimer: null,

      // 정렬 기준
      sortBy: "popularity",
    };
  },

  methods: {
    // 배우 검색
    async searchActors() {
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(async () => {
        if (this.actorSearch.length < 2) return;
        try {
          const results = await searchPeople(this.actorSearch);
          this.actorResults = results.slice(0, 5);
        } catch (error) {
          console.error("Error searching actors:", error);
        }
      }, 300);
    },

    // 감독 검색
    async searchDirectors() {
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(async () => {
        if (this.directorSearch.length < 2) return;
        try {
          const results = await searchPeople(this.directorSearch);
          this.directorResults = results.slice(0, 5);
        } catch (error) {
          console.error("Error searching directors:", error);
        }
      }, 300);
    },

    // 컬렉션 검색
    async searchCollections() {
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(async () => {
        if (this.collectionSearch.length < 2) return;
        try {
          const results = await searchCollections(this.collectionSearch);
          this.collectionResults = results.slice(0, 5);
        } catch (error) {
          console.error("Error searching collections:", error);
        }
      }, 300);
    },

    // 키워드 검색
    async searchKeywords() {
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(async () => {
        if (this.keywordSearch.length < 2) return;
        try {
          const results = await searchKeywords(this.keywordSearch);
          this.keywordResults = results.slice(0, 5);
        } catch (error) {
          console.error("Error searching keywords:", error);
        }
      }, 300);
    },

    // 항목 선택
    selectActor(actor) {
      if (!this.selectedActors.find((a) => a.id === actor.id)) {
        this.selectedActors.push(actor);
        this.searchQuery.withPeople.push(actor.id);
      }
      this.actorSearch = "";
      this.actorResults = [];
    },

    selectDirector(director) {
      if (!this.selectedDirectors.find((d) => d.id === director.id)) {
        this.selectedDirectors.push(director);
        this.searchQuery.withCrew.push(director.id);
      }
      this.directorSearch = "";
      this.directorResults = [];
    },

    selectCollection(collection) {
      this.selectedCollection = collection;
      this.searchQuery.withCollections = [collection.id];
      this.collectionSearch = "";
      this.collectionResults = [];
    },

    selectKeyword(keyword) {
      if (!this.selectedKeywords.find((k) => k.id === keyword.id)) {
        this.selectedKeywords.push(keyword);
        this.searchQuery.withKeywords.push(keyword.id);
      }
      this.keywordSearch = "";
      this.keywordResults = [];
    },

    // 항목 제거
    removeActor(actor) {
      this.selectedActors = this.selectedActors.filter(
        (a) => a.id !== actor.id
      );
      this.searchQuery.withPeople = this.searchQuery.withPeople.filter(
        (id) => id !== actor.id
      );
    },

    removeDirector(director) {
      this.selectedDirectors = this.selectedDirectors.filter(
        (d) => d.id !== director.id
      );
      this.searchQuery.withCrew = this.searchQuery.withCrew.filter(
        (id) => id !== director.id
      );
    },

    removeCollection() {
      this.selectedCollection = null;
      this.searchQuery.withCollections = [];
    },

    removeKeyword(keyword) {
      this.selectedKeywords = this.selectedKeywords.filter(
        (k) => k.id !== keyword.id
      );
      this.searchQuery.withKeywords = this.searchQuery.withKeywords.filter(
        (id) => id !== keyword.id
      );
    },

    // 검색 결과 정렬
    sortResults() {
      if (this.sortBy === "popularity") {
        this.searchResults.sort((a, b) => b.popularity - a.popularity);
      } else if (this.sortBy === "release_date") {
        this.searchResults.sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date) : new Date(0);
          const dateB = b.release_date ? new Date(b.release_date) : new Date(0);
          return dateB - dateA;
        });
      } else if (this.sortBy === "vote_average") {
        this.searchResults.sort((a, b) => b.vote_average - a.vote_average);
      }
    },

    // 영화 검색
    async searchMovies() {
      try {
        let response;

        // 제목 검색이 있는 경우 search/movie 엔드포인트 사용
        if (this.searchQuery.title) {
          // 검색어 정규화
          const normalizedTitle = this.searchQuery.title
            .trim() // 앞뒤 공백 제거
            .replace(/\s+/g, " ") // 여러 공백을 하나로 통일
            .replace(/[의]/g, " ") // 조사 제거
            .replace(/\s+/g, " ") // 조사 제거 후 생긴 공백 정리
            .trim(); // 최종 공백 정리

          // 검색어를 단어 단위로 분리
          const searchTerms = normalizedTitle
            .split(" ")
            .filter((term) => term.length > 0);

          // 각 단어로 검색 후 결과 합치기
          const searchPromises = searchTerms.map((term) => searchMovies(term));
          const searchResults = await Promise.all(searchPromises);

          // 중복 제거 및 결과 합치기
          const uniqueMovies = new Map();
          searchResults.flat().forEach((movie) => {
            if (!uniqueMovies.has(movie.id)) {
              uniqueMovies.set(movie.id, movie);
            }
          });

          this.searchResults = Array.from(uniqueMovies.values());
          this.sortResults(); // 검색 후 정렬 적용
          this.totalPages = 1;
          this.totalResults = this.searchResults.length;
          return;
        }

        // 그 외의 경우 discover/movie 엔드포인트 사용
        const params = {
          page: this.currentPage,
          sort_by:
            this.sortBy === "popularity"
              ? "popularity.desc"
              : this.sortBy === "release_date"
              ? "primary_release_date.desc"
              : "vote_average.desc",
        };

        // 장르
        if (this.searchQuery.genres.length > 0) {
          params.with_genres = this.searchQuery.genres.join(",");
        }

        // 출시 연도
        if (this.searchQuery.yearFrom) {
          params.primary_release_date_gte = `${this.searchQuery.yearFrom}-01-01`;
        }
        if (this.searchQuery.yearTo) {
          params.primary_release_date_lte = `${this.searchQuery.yearTo}-12-31`;
        }

        // 인물
        if (this.searchQuery.withPeople.length > 0) {
          params.with_people = this.searchQuery.withPeople.join(",");
        }
        if (this.searchQuery.withCrew.length > 0) {
          params.with_crew = this.searchQuery.withCrew.join(",");
        }

        // 컬렉션
        if (this.searchQuery.withCollections.length > 0) {
          params.with_collections = this.searchQuery.withCollections.join(",");
        }

        // 키워드
        if (this.searchQuery.withKeywords.length > 0) {
          params.with_keywords = this.searchQuery.withKeywords.join(",");
        }

        response = await discoverMovies(params);
        this.searchResults = response.results;
        this.totalPages = response.total_pages;
        this.totalResults = response.total_results;
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    },

    // 페이지 변경
    changePage(page) {
      this.currentPage = page;
      this.searchMovies();
    },

    // 날짜 포맷
    formatDate(dateString) {
      if (!dateString) return "";
      return dateString.replace(/-/g, ".");
    },

    // 상세 페이지 이동
    moveDetail(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
  },

  async created() {
    try {
      // 장르 목록 가져오기
      const genres = await getMovieGenres();
      this.genres = Object.entries(genres).map(([id, name]) => ({
        id: parseInt(id),
        name,
      }));
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  },
};
</script>

<style scoped>
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sort-options select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
}

.sort-options select:hover {
  border-color: #999;
}

.sort-options select:focus {
  outline: none;
  border-color: #666;
}
</style>
