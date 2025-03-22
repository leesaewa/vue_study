<template>
  <div class="detail-info">
    <h4 class="ttl">Details</h4>
    <dl v-for="(item, index) in infoList" :key="index" class="info-item">
      <dt>{{ item.label }}</dt>
      <dd>{{ item.content }}</dd>
    </dl>
    <img
      v-if="director && director.profilePath"
      :src="
        director && director.profilePath
          ? `https://image.tmdb.org/t/p/w500${director.profilePath}`
          : require('@/assets/images/no-image.gif')
      "
      alt="감독 사진"
      class="director-image"
    />
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    director: {
      type: Object,
      default: () => ({}),
    },
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    infoList() {
      return [
        {
          label: "Director",
          content: this.director?.name || "",
        },
        {
          label: "소개",
          content: this.director?.biography || "정보가 없습니다.",
        },
        {
          label: "언어",
          content: this.movie.spoken_languages
            ? this.movie.spoken_languages.map((lang) => lang.name).join(", ")
            : "정보가 없습니다.",
        },
        // 필요한 정보를 여기에 추가할 수 있습니다
      ];
    },
  },
};
</script>

<style scoped>
.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

dt {
  font-weight: bold;
  min-width: 80px;
}

dd {
  margin: 0;
}

.director-image {
  max-width: 150px;
  border-radius: 8px;
  margin-top: 0.5rem;
}
</style>
