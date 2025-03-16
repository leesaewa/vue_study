<template>
  <div v-if="videoKey" class="trailer-wrap">
    <iframe
      :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}`"
      frameborder="0"
      allowfullscreen
      autoplay
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "Trailer",

  props: {
    videoKey: {
      type: String,
      default: null,
    },
  },
};
</script>
