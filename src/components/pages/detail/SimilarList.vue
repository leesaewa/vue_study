<template>
  <div class="similar-list">
    <h4 class="ttl">Similar Movies</h4>
    <ul>
      <li v-for="(item, itemIndex) in displayedSimilarList" :key="itemIndex">
        <router-link :to="`/movie/${item.id}`">
          <figure>
            <img
              :src="
                item.posterPath
                  ? `https://image.tmdb.org/t/p/original${item.posterPath}`
                  : require('@/assets/images/no-image.gif')
              "
              alt=""
            />
            <figcaption>
              <h5>{{ item.title }}</h5>
              <div>
                <span>{{ item.title }}</span>
                <span>{{ item.release_date }}</span>
                <button type="button">more view</button>
              </div>
            </figcaption>
          </figure>
        </router-link>
      </li>
    </ul>

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
        this.visibleCount = this.itemsPerPage;
      } else {
        this.visibleCount = Math.min(
          this.visibleCount + this.itemsPerPage,
          this.similarList.length
        );
      }
    },
  },
};
</script>
