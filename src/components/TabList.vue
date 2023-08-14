<template>
  <div class="tab-container">
    <ul class="tabs">
      <li
        v-for="tab in tabItem"
        :key="tab.id"
        :class="{ active: tab.id === isActive }"
      >
        <button type="button" @click="handleSelected(tab.id)">
          {{ tab.text }}
        </button>
      </li>
    </ul>

    <section class="tab-cont">
      <div v-if="isActive === 1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quasi qui
        labore. Neque, dolorem obcaecati. Alias, sequi corporis dignissimos
        cumque praesentium, explicabo ullam, corrupti iure quod debitis adipisci
        repellendus obcaecati?
      </div>
      <div v-if="isActive === 2">
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis hic
          dolorum libero? Tempore, voluptatibus velit magni, tenetur illum in
          itaque, perspiciatis eos doloribus veritatis recusandae consectetur.
          Vel autem aspernatur esse?
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "TabList",

  data() {
    return {
      tabItem: [
        { id: 1, text: "Tab01" },
        { id: 2, text: "Tab02" },
        { id: 3, text: "Tab03" },
        { id: 4, text: "Tab04" },
        { id: 5, text: "Tab05" },
      ],
      isActive: 1,
    };
  },

  methods: {
    handleSelected(id) {
      this.isActive = id;
    },
  },
};
</script>

<style>
.tab-container {
  border: 1px solid red;
  max-width: 1000px;
  margin: 0 auto;
}
.tab-container .tabs {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.tab-container .tabs li {
  width: 100%;
}
.tab-container .tabs li button {
  border: 0;
  width: 100%;
}
</style>
