<template>
  <div class="overview">
    <div class="overview-poster">
      <img
        v-if="movie.poster_path"
        :src="
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : require('@/assets/images/no-image.gif')
        "
        alt=""
      />
    </div>
    <div>
      <div class="overview-info">
        <DetailInfo :movie="movie" :crew="movie.crew" :genres="genres" />
        <Cast v-if="movie.cast" :cast="movie.cast" />
      </div>
      <div class="overview-desc">
        <h4 class="ttl">Storyline</h4>
        {{ movie.overview }}

        <Trailer v-if="movie.videoKey" :videoKey="movie.videoKey" />
      </div>
    </div>
  </div>
</template>

<script>
import DetailInfo from "@/components/pages/detail/DetailInfo.vue";
import Cast from "@/components/pages/detail/Cast.vue";
import Trailer from "@/components/pages/detail/Trailer.vue";

export default {
  name: "Overview",

  components: { DetailInfo, Cast, Trailer },

  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>
