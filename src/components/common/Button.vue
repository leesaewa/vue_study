<template>
  <button :type="type" class="btn-basic">
    <template v-if="text">{{ text }}</template>
    <template></template>
  </button>
</template>

<script>
export default {
  name: "Button",

  props: {
    type: {
      type: String,
      default: "button",
    },
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
