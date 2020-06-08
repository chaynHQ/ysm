import * as Quasar from 'quasar';
import { mountQuasar } from '~/test/jest/utils';

import Index from './Index.vue';

const QBtn = Quasar.QBtn;

describe('pages/Index.vue', () => {
  const wrapper = mountQuasar(Index);
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('LandingPage');
  });

  it('should have an expected class on the wrapper DOM node', () => {
    expect(wrapper.classes('landing-page')).toBe(true);
  });

  it('should contain two QBtn components', () => {
    expect(wrapper.findAllComponents(QBtn)).toHaveLength(2);
  });
});
