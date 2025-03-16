<template>
  <ul v-if="cast.length > 0" class="cast">
    <li v-for="(item, castIndex) in cast" :key="castIndex">
      <span>{{ item.character }}</span>
      {{ item.name }}
      <img
        :src="
          item.profilePath
            ? `https://image.tmdb.org/t/p/original${item.profilePath}`
            : require('@/assets/images/no-image.gif')
        "
        alt=""
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "Cast",

  props: {
    cast: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
