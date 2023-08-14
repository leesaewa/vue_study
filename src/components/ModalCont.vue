<template>
  <div>
    <button class="btn-open" @click="showModal = true" type="button">
      Open Modal
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
.btn-open {
  cursor: pointer;
  width: 150px;
  height: 50px;
  background-color: #102c57;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  border: 1px solid #102c57;
  border-radius: 50px;
  margin-bottom: 30px;
}
.btn-open:hover {
  background-color: #dac0a3;
  color: #102c57;
}
.btn-open:active {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}
</style>
