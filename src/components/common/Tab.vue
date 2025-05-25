<template>
  <div class="tab">
    <ul>
      <li
        v-for="(item, index) in tabList"
        :key="index"
        :class="{ active: selectBtn === index }"
      >
        <Button :text="item.text" @click="handleTab(index, item.id)" />
      </li>
    </ul>
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";

export default {
  name: "Tab",

  components: {
    Button,
  },

  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectBtn: 0,
    };
  },

  methods: {
    handleTab(index, tabId) {
      this.selectBtn = index;
      this.$emit("select-tab", tabId);
    },
  },
};
</script>
