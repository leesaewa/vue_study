<template>
  <div class="cast-wrapper">
    <ul v-if="cast.length > 0" class="cast-list">
      <li v-for="(item, castIndex) in displayedCast" :key="castIndex">
        <img
          :src="
            item.profilePath
              ? `https://image.tmdb.org/t/p/original${item.profilePath}`
              : require('@/assets/images/no-image.gif')
          "
          alt=""
        />
        <span>
          <strong>{{ item.character }}</strong>
          {{ item.name }}
        </span>
      </li>
    </ul>
    <button
      v-if="cast.length > 5"
      @click="showAll = !showAll"
      class="more-button"
    >
      {{ showAll ? "접기" : "더보기" }}
    </button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "Cast",

  props: {
    cast: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const showAll = ref(false);

    const displayedCast = computed(() => {
      return showAll.value ? props.cast : props.cast.slice(0, 5);
    });

    return {
      showAll,
      displayedCast,
    };
  },
};
</script>

<style scoped>
.cast-wrapper {
  position: relative;
}

.more-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.more-button:hover {
  background-color: #e0e0e0;
}
</style>
