<template>
  <div class="cast-wrapper">
    <h4 class="ttl">Cast</h4>
    <ul v-if="cast.length > 0">
      <li
        v-for="(item, castIndex) in displayedCast"
        :key="castIndex"
        class="credits-list"
      >
        <img
          :src="
            item.profilePath
              ? `https://image.tmdb.org/t/p/original${item.profilePath}`
              : require('@/assets/images/no-image.gif')
          "
          alt=""
          class="cast-image"
        />
        <span>
          <strong>{{ item.character }}</strong>
          {{ item.name }}
        </span>
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
  name: "Cast",

  components: {
    MoreButton,
  },

  props: {
    cast: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      visibleCount: 7,
      itemsPerPage: 5,
    };
  },

  computed: {
    displayedCast() {
      return this.cast.slice(0, this.visibleCount);
    },
    hasMoreItems() {
      return this.cast.length > 5;
    },
    isAllVisible() {
      return this.visibleCount >= this.cast.length;
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
          this.cast.length
        );
      }
    },
  },
};
</script>
