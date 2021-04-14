import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/teachers',
    name: 'Teacher',
    component: () => import('../views/Teacher.vue')
  },
  {
    path: '/teacher-form',
    name: 'TeacherForm',
    component: () => import('../views/TeacherInfoForm.vue')
  },
  {
    path: '/teacher-form/:id',
    name: 'TeacherInfoForm',
    component: () => import('../views/TeacherInfoForm.vue')
  },
  {
    path: '/subjects',
    name: 'Subject',
    component: () => import('../views/Subject.vue')
  },
  {
    path: '/courses',
    name: 'Course',
    component: () => import('../views/Course.vue')
  },
  {
    path: '/add-course',
    name: 'CourseInfo',
    component: () => import('../views/course/CourseInfo.vue')
  }, 
  {
    path: '/add-course/:id',
    name: 'CourseAdd',
    component: () => import('../views/course/CourseInfo.vue'),
    hidden: true
  },
  {
    path: '/chapter/:id',
    name: 'CourseChapter',
    component: () => import('../views/course/CourseChapter.vue'),
    hidden: true
  },
  {
    path: '/publish/:id',
    name: 'CoursePublish',
    component: () => import('../views/course/CoursePublish.vue'),
    hidden: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
