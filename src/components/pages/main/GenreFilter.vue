<template>
  <div class="genre-filter">
    <div class="filter-header">
      <h2>장르별 영화</h2>
      <div class="filter-controls">
        <button class="filter-toggle" @click="isOpen = !isOpen">
          {{ isOpen ? "필터 닫기" : "필터 열기" }}
          <span class="toggle-icon">{{ isOpen ? "▼" : "▲" }}</span>
        </button>
      </div>
    </div>

    <div class="filter-content" :class="{ 'is-open': isOpen }">
      <div class="genre-tags">
        <button
          v-for="genre in allGenres"
          :key="genre.id"
          class="genre-tag"
          :class="{ active: selectedGenres.includes(genre.id) }"
          @click="toggleGenre(genre.id)"
        >
          {{ genre.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenreFilter",
  props: {
    genres: {
      type: Object,
      required: true,
    },
    selectedGenres: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    allGenres() {
      return Object.entries(this.genres)
        .map(([id, name]) => ({
          id: parseInt(id),
          name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    toggleGenre(genreId) {
      const newSelectedGenres = [...this.selectedGenres];
      const index = newSelectedGenres.indexOf(genreId);

      if (index === -1) {
        newSelectedGenres.push(genreId);
      } else {
        newSelectedGenres.splice(index, 1);
      }

      this.$emit("update:selectedGenres", newSelectedGenres);
    },
  },
};
</script>

<style scoped>
.genre-filter {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.filter-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.filter-controls {
  display: flex;
  gap: 10px;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-toggle:hover {
  background: #f5f5f5;
}

.toggle-icon {
  font-size: 12px;
}

.filter-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.filter-content.is-open {
  max-height: 500px;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}

.genre-tag {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.genre-tag:hover {
  background: #f5f5f5;
}

.genre-tag.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
