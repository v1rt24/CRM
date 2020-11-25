import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'Main', title: 'Главная'},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'Main', title: 'Категории'},
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories'),
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {layout: 'Main', title: 'Детали'},
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail'),
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'Main', title: 'История'},
    component: () => import(/* webpackChunkName: "history" */ '../views/History'),
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'Main', title: 'Планирование'},
    component: () => import(/* webpackChunkName: "planning" */ '../views/Planning'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'Main', title: 'Пользователь'},
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'Main', title: 'Новая запись'},
    component: () => import(/* webpackChunkName: "record" */ '../views/Record'),
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: {layout: 'Auth', title: 'Регистрация'},
    component: () => import(/* webpackChunkName: "registration" */ '../views/Registration'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'Auth', title: 'Авторизация'},
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    next();
  }
  else {
    document.title = '';
    next();
  }
});

export default router;
