<template>
  <ModalCont msg="Welcome to Your Vue.js App" />
  <TabList />
</template>

<script>
import ModalCont from "./components/ModalCont.vue";
import TabList from "./components/TabList.vue";

export default {
  name: "App",
  components: {
    ModalCont,
    TabList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
