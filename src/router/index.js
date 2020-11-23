import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'Main'},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'Main'},
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories'),
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {layout: 'Main'},
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail'),
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'Main'},
    component: () => import(/* webpackChunkName: "history" */ '../views/History'),
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'Main'},
    component: () => import(/* webpackChunkName: "planning" */ '../views/Planning'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'Main'},
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'Main'},
    component: () => import(/* webpackChunkName: "record" */ '../views/Record'),
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: {layout: 'Auth'},
    component: () => import(/* webpackChunkName: "registration" */ '../views/Registration'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'Auth'},
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
