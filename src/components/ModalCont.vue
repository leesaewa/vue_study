<template>
  <div>
    <button
      @click="showModal = true"
      type="button"
      style="
        border: 1px solid skyblue;
        width: 150px;
        height: 50px;
        background-color: aquamarine;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        border-radius: 50px;
      "
    >
      button
    </button>

    <ModalView v-show="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import ModalView from "./ModalView.vue";
export default {
  name: "ModalCont",

  components: {
    ModalView,
  },

  props: {},

  data() {
    return {
      showModal: false,
    };
  },

  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-inner {
}
</style>
