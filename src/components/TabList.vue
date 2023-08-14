<template>
  <div class="tab-container">
    <ul class="tabs">
      <li
        v-for="tab in tabItem"
        :key="tab.id"
        :class="{ active: selectBtn === 1 }"
      >
        <button type="button">{{ tab.text }}</button>
      </li>
    </ul>

    <section class="tab-cont">
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quasi qui
        labore. Neque, dolorem obcaecati. Alias, sequi corporis dignissimos
        cumque praesentium, explicabo ullam, corrupti iure quod debitis adipisci
        repellendus obcaecati?
      </div>
      <div>
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
      ],
      selectBtn: 1,
    };
  },

  methods: {
    selected() {
      this.selectBtn === this.selectBtn;
    },
  },
};
</script>

<style></style>
