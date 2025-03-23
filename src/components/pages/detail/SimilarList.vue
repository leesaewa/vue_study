<template>
  <div class="similar-list">
    <h4 class="ttl">Similar Movies</h4>
    <ul>
      <li v-for="(item, itemIndex) in displayedSimilarList" :key="itemIndex">
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
    <!-- <button v-if="hasMoreItems" @click="showMoreItems" class="more-button">
      {{ isAllVisible ? "접기" : "더보기" }}
    </button> -->

    <MoreButton
      :hasMoreItems="hasMoreItems"
      :isAllVisible="isAllVisible"
      @showMoreItems="showMoreItems"
    />
  </div>
</template>

<script>
import MoreButton from "@/components/common/MoreButton.vue";

export default {
  name: "SimilarList",

  components: {
    MoreButton,
  },

  props: {
    similarList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      visibleCount: 5,
      itemsPerPage: 5,
    };
  },

  computed: {
    displayedSimilarList() {
      return this.similarList.slice(0, this.visibleCount);
    },
    hasMoreItems() {
      return this.similarList.length > 5;
    },
    isAllVisible() {
      return this.visibleCount >= this.similarList.length;
    },
  },

  methods: {
    showMoreItems() {
      if (this.isAllVisible) {
        // 접기 버튼을 눌렀을 때
        this.visibleCount = this.itemsPerPage;
      } else {
        // 더보기 버튼을 눌렀을 때
        this.visibleCount = Math.min(
          this.visibleCount + this.itemsPerPage,
          this.similarList.length
        );
      }
    },
  },
};
</script>
