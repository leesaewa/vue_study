<template>
  <div class="summary">
    <div class="title">
      <h2>
        {{ summary.title }} <b>{{ summary.release_date }}</b>
      </h2>
      <span>{{ summary.original_title }}</span>
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
};
</script>
