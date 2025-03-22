<template>
  <div class="similar-list">
    <h4 class="ttl">Similar Movies</h4>
    <ul>
      <li v-for="(item, itemIndex) in similarList" :key="itemIndex">
        <router-link :to="`/movie/${item.id}`">
          <img
            :src="
              item.posterPath
                ? `https://image.tmdb.org/t/p/original${item.posterPath}`
                : require('@/assets/images/no-image.gif')
            "
            alt=""
          />
          {{ item.title }}
        </router-link>
      </li>
    </ul>
    <button>더 보기</button>
  </div>
</template>

<script>
export default {
  name: "SimilarList",

  props: {
    similarList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
