<template>
  <div class="similar-list">
    <h2>similar</h2>
    <ul>
      <li v-for="(item, itemIndex) in similarList" :key="itemIndex">
        {{ item.title }}
        <img
          :src="
            item.posterPath
              ? `https://image.tmdb.org/t/p/original${item.posterPath}`
              : require('@/assets/images/no-image.gif')
          "
          alt=""
        />
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
