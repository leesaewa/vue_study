<template>
  <transition name="fade">
    <div class="modal-container">
      <div role="dialog" class="modal-inner">
        <h2>modal title</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          natus sed quas esse excepturi. Velit vero similique tempore dolor
          ducimus tempora perferendis minus et neque dolorum molestiae officia
          labore ea possimus veritatis inventore, repellat ullam odit obcaecati
          assumenda? Nobis officia a voluptatum blanditiis quia veritatis
          temporibus excepturi asperiores omnis ratione!
        </p>
        <button class="btn-close" @click="$emit('close')" type="button">
          X
        </button>
      </div>

      <div class="modal-overlay" @click="$emit('close')"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalView",
};
</script>

<style>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  padding: 60px 0;
  border-radius: 20px;
  z-index: 9;
}
.modal-overlay {
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
}
.btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 34px;
  height: 34px;
  background-color: #102c57;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 9px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
