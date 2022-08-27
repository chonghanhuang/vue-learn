import Vue from "vue"
import MyRouter from "./my-router"
import HomeView from "../views/HomeView.vue"

Vue.use(MyRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/TestView.vue")
  }
]

const router = new MyRouter({ routes })

export default router
