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
    </div>

    <!-- collection -->
    <div class="collection-section">
      <h2>인기 컬렉션</h2>
      <div class="collection-grid" v-if="collections.length > 0">
        <div
          v-for="collection in collections"
          :key="collection.id"
          class="collection-card"
          @click="goToCollectionDetail(collection.id)"
        >
          <div class="collection-poster">
            <img
              :src="`https://image.tmdb.org/t/p/w500${collection.backdrop_path}`"
              :alt="collection.name"
            />
          </div>
          <div class="collection-info">
            <h3>{{ collection.name }}</h3>
            <p class="movie-count">
              {{ collection.parts ? collection.parts.length : 0 }}개의 영화
            </p>
            <p class="collection-overview">{{ collection.overview }}</p>
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
  getCollection,
} from "@/api/tmdb";
import Tab from "@/components/common/Tab.vue";
import MainSlider from "@/components/pages/main/MainSlider.vue";
import MovieList from "@/components/pages/main/MovieList.vue";

export default {
  name: "Main",

  components: {
    Tab,
    MainSlider,
    MovieList,
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
      topRated: [],
      upComing: [],
      dayTrend: [],
      weekTrend: [],
      collections: [],
      genreMap: {},
      currentTab: "nowPlaying",
      // 유명 컬렉션 ID 목록
      collectionIds: [
        1241, // 해리 포터
        86311, // 어벤져스
        295, // 파이러츠 오브 캐리비안
        119, // 반지의 제왕
        10, // 스타워즈
        645, // 제임스 본드
        87359, // 미션 임파서블
        10194, // 토이 스토리
        328, // 쥬라기 공원
      ],
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
          return this.topRated;
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
  },

  methods: {
    handleTabSelect(tabId) {
      this.currentTab = tabId;
    },

    async fetchCollections() {
      try {
        const collectionsData = await Promise.all(
          this.collectionIds.map((id) => getCollection(id))
        );

        // 해리포터 컬렉션에 한글 overview 추가
        this.collections = collectionsData.map((collection) => {
          if (collection.id === 1241) {
            // 해리포터 컬렉션 ID
            return {
              ...collection,
              overview:
                "해리 포터 시리즈는 J.K. 롤링의 판타지 소설을 원작으로 한 영화 시리즈입니다. 호그와트 마법학교를 배경으로 마법사 소년 해리 포터와 그의 친구들이 어둠의 마법사 볼드모트와 맞서 싸우는 이야기를 그렸습니다. 마법의 세계를 배경으로 한 모험, 우정, 사랑, 그리고 성장을 담은 이 시리즈는 전 세계적으로 큰 사랑을 받았습니다.",
            };
          } else if (collection.id === 119) {
            return {
              ...collection,
              overview:
                "반지의 제왕 3부작은 J. R. R. 톨킨의 영향력 있는 소설을 원작으로 한 서사적인 판타지 영화들로, 피터 잭슨 감독이 연출을 맡았다.",
            };
          } else if (collection.id === 87359) {
            return {
              ...collection,
              overview:
                "미션 임파서블은 1966년부터 1973년까지 방영된 인기 TV 시리즈를 바탕으로 한 첩보 액션 영화 시리즈이다. 이 시리즈는 이단 헌트 요원을 중심으로 한 IMF(불가능한 임무 부대) 팀의 작전을 그리고 있다.",
            };
          }
          return collection;
        });
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },

    goToCollectionDetail(collectionId) {
      this.$router.push(`/collection/${collectionId}`);
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
      this.topRated = topRated;
      this.upComing = upComing;
      this.dayTrend = dayTrend;
      this.weekTrend = weekTrend;
      this.genreMap = genres;

      // 컬렉션 데이터 가져오기
      await this.fetchCollections();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>

<style scoped>
.collection-section {
  padding: 2rem;
}

.collection-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.collection-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.collection-card:hover {
  transform: translateY(-5px);
}

.collection-poster {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.collection-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collection-info {
  padding: 1.5rem;
}

.collection-info h3 {
  font-size: 1.4rem;
  color: black;
  margin-bottom: 0.5rem;
}

.movie-count {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.collection-overview {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #444;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
