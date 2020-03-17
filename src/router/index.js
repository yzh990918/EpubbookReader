import Vue from "vue";
import VueRouter from "vue-router";
import reader from "../views/reader";
import ebookReader from "../components/reader/ebookreader";
Vue.use(VueRouter);

const routes = [
  {
    path: "/"
  },
  {
    path: "/reader",
    name: "reader",
    component: reader,
    children: [
      {
        path: ":fileName",
        component: ebookReader
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
