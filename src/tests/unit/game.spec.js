import { mount } from '@vue/test-utils';
import Game from '../../views/Game.vue';

const wrapper = mount(Game);
describe('Game.vue', () => {
  test('setup correctly', () => {
    expect(true).toBe(true);
  });
});
