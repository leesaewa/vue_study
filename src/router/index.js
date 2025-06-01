// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import CollectionDetail from "@/views/CollectionDetail.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: () => import("../views/MovieDetail.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/collection/:id",
    name: "CollectionDetail",
    component: CollectionDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
