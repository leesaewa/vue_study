<template>
  <div class="collection-detail">
    <div class="collection-header" v-if="collection">
      <div class="backdrop">
        <img
          :src="`https://image.tmdb.org/t/p/original${collection.backdrop_path}`"
          :alt="collection.name"
        />
      </div>
      <div class="collection-info">
        <img
          :src="`https://image.tmdb.org/t/p/original${collection.poster_path}`"
          width="100"
        />
        <h1>{{ collection.name }}</h1>
        <p class="overview">{{ collection.overview }}</p>
        <p class="movie-count">{{ collection.parts.length }}개의 영화</p>
      </div>
    </div>

    <div class="movies-grid" v-if="collection">
      <div v-for="movie in collection.parts" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p class="release-date">{{ movie.release_date }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCollection } from "@/api/tmdb";

export default {
  name: "CollectionDetail",
  data() {
    return {
      collection: null,
    };
  },
  async created() {
    try {
      const collectionId = this.$route.params.id;
      this.collection = await getCollection(collectionId);

      if (this.collection.id === 1241) {
        this.collection = {
          ...this.collection,
          overview:
            "해리 포터 시리즈는 J.K. 롤링의 판타지 소설을 원작으로 한 영화 시리즈이다. 호그와트 마법학교를 배경으로 마법사 소년 해리 포터와 그의 친구들이 어둠의 마법사 볼드모트와 맞서 싸우는 이야기를 그렸다. 마법의 세계를 배경으로 한 모험, 우정, 사랑, 그리고 성장을 담은 이 시리즈는 전 세계적으로 큰 사랑을 받았다.",
        };
      } else if (this.collection.id === 119) {
        this.collection = {
          ...this.collection,
          overview:
            "반지의 제왕 3부작은 J. R. R. 톨킨의 영향력 있는 소설을 원작으로 한 서사적인 판타지 영화들로, 피터 잭슨 감독이 연출을 맡았다.",
        };
      } else if (this.collection.id === 87359) {
        this.collection = {
          ...this.collection,
          overview:
            "미션 임파서블은 1966년부터 1973년까지 방영된 인기 TV 시리즈를 바탕으로 한 첩보 액션 영화 시리즈이다. 이 시리즈는 이단 헌트 요원을 중심으로 한 IMF(불가능한 임무 부대) 팀의 작전을 그리고 있다.",
        };
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  },
};
</script>

<style scoped>
.collection-detail {
  padding: 2rem;
}

.collection-header {
  position: relative;
  margin-bottom: 2rem;
}

.backdrop {
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
}

.backdrop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collection-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.collection-info h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.overview {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  max-width: 800px;
}

.movie-count {
  font-size: 1rem;
  color: #ccc;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.movie-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-info {
  padding: 1rem;
}

.movie-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.release-date {
  font-size: 0.9rem;
  color: #666;
}
</style>
