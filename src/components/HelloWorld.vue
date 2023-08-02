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

    <ModalView v-show="showModal" @close="showModal = false">
      <slot>
        <h2>modal title</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          natus sed quas esse excepturi. Velit vero similique tempore dolor
          ducimus tempora perferendis minus et neque dolorum molestiae officia
          labore ea possimus veritatis inventore, repellat ullam odit obcaecati
          assumenda? Nobis officia a voluptatum blanditiis quia veritatis
          temporibus excepturi asperiores omnis ratione!
        </p>
      </slot>
    </ModalView>
  </div>
</template>

<script>
import ModalView from "./ModalView.vue";
export default {
  name: "HelloWorld",

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
