<template>
  <div class="detail-info">
    <h4 class="ttl">Details</h4>
    <dl v-for="(item, index) in infoList" :key="index" class="info-item">
      <template v-if="item.type === 'crew'">
        <dd class="credits-list">
          <img
            v-if="item.profilePath"
            :src="
              item.profilePath
                ? `https://image.tmdb.org/t/p/w500${item.profilePath}`
                : require('@/assets/images/no-image.gif')
            "
            alt="감독 사진"
            class="cast-image"
          />

          <span>
            <strong>{{ item.label }}</strong>
            {{ item.content ? item.content : "정보가 없습니다." }}
          </span>
        </dd>
      </template>

      <template v-else>
        <dt>{{ item.label }}</dt>
        <dd>
          {{ item.content ? item.content : "정보가 없습니다." }}
          <b v-if="item.runtime">({{ item.runtime }}분)</b>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    crew: {
      type: Array,
      default: () => [],
    },
    genres: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    infoList() {
      const movieInfo = [
        {
          label: "평점",
          content: Math.floor(this.movie.rating * 10) / 10,
          type: "movie",
        },
        {
          label: "상영 시간",
          content: this.handleRuntime(this.movie.runtime),
          runtime: this.movie.runtime,
          type: "movie",
        },
        { label: "제작비", content: this.movie.budget, type: "movie" },
        { label: "수익", content: this.movie.revenue, type: "movie" },
        {
          label: "조회수",
          content: this.movie.popularity,
          type: "movie",
        },
        {
          label: "개봉일",
          content: this.movie.release_date,
          type: "movie",
        },
        {
          label: "언어",
          content: this.movie.spoken_languages
            .map((lang) => lang.name)
            .join(", "),
          type: "movie",
        },
        {
          label: "장르",
          content: this.getGenres(),
          type: "movie",
        },
      ];
      const crewInfo = this.crew.map((member) => ({
        label: member.job,
        content: member.name,
        profilePath: member.profilePath,
        type: "crew",
      }));

      return [...movieInfo, ...crewInfo];
    },
  },

  methods: {
    handleRuntime(runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}시간 ${minutes}분`;
    },
    getGenres() {
      if (this.movie.genres) {
        return this.movie.genres.map((g) => g.name).join(", ");
      } else if (this.movie.genre_ids) {
        return this.movie.genre_ids.map((id) => this.genres[id]).join(", ");
      }
      return "정보가 없습니다.";
    },
  },
};
</script>
