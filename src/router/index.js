import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Quizboard from '../views/Quizboard.vue';
import Result from '../views/Result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quizboard',
    name: 'Quizboard',
    component:Quizboard,
    props: route => ({ difficulty: route.query.difficulty, topic:route.query.topic })
  },
  {
    path:'/result',
    name:'Result',
    component:Result,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
