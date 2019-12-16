import Game from '../views/Game.vue';
import { beforeEnter } from '../utils/beforeEnter.js';

export default [
  {
    path: '/game/:id',
    name: 'game',
    component: Game,
    beforeEnter
  }
];
