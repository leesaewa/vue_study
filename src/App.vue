<template>
  <ModalCont msg="Welcome to Your Vue.js App" />
  <TabList />
  <FixedTable />
</template>

<script>
import ModalCont from "./components/ModalCont.vue";
import TabList from "./components/TabList.vue";
import FixedTable from "./components/FixedTable.vue";

export default {
  name: "App",
  components: {
    ModalCont,
    TabList,
    FixedTable,
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
