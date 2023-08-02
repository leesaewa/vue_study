<template>
  <transition name="fade">
    <div>
      <div
        role="dialog"
        class="modal-inner"
        style="
          text-align: center;
          background-color: white;
          height: 500px;
          width: 500px;
          margin-top: 10%;
          padding: 60px 0;
          border-radius: 20px;
          position: relative;
          z-index: 9;
        "
      >
        <slot> test modal text </slot>
        <button
          @click="$emit('close')"
          type="button"
          style="
            border: 1px solid skyblue;
            width: 50px;
            height: 50px;
            background-color: cadetblue;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            border-radius: 50px;
          "
        >
          X
        </button>
      </div>

      <div
        class="modal-overlay"
        @click="$emit('close')"
        style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #000000;
          opacity: 0.4;
        "
      ></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalView",
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
