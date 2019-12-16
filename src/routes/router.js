import Vue from 'vue';
import Router from 'vue-router';

import Home from './../views/Home.vue';
import game from './game';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  ...game
];

export default new Router({ base: process.env.BASE_URL, mode: 'history', routes });
