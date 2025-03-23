<template>
  <button
    v-if="hasMoreItems"
    @click="$emit('showMoreItems')"
    class="more-button"
  >
    {{ isAllVisible ? "접기" : "더보기" }}
  </button>
</template>

<script>
export default {
  name: "MoreButton",

  props: {
    hasMoreItems: {
      type: Boolean,
      default: false,
    },
    showMoreItems: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
