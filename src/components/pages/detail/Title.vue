<template>
  <div class="summary">
    <div class="title">
      <h2>
        {{ summary.title }} <b>{{ summary.release_date }}</b>
      </h2>
      <span>{{ summary.original_title }}</span>
      <p>{{ Math.floor(summary.rating * 10) / 10 }}</p>
      <p>{{ handleRuntime(summary.runtime) }}</p>
      <p>{{ summary.tagline }}</p>
    </div>

    <div class="button">
      <a :href="summary.homepage" target="_blank">홈페이지</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",

  props: {
    summary: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleRuntime(runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}시간 ${minutes}분`;
    },
  },
};
</script>
