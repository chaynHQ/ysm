import * as Quasar from 'quasar';
import { mountQuasar } from '~/test/jest/utils';

import Index from './Index.vue';

const QBtn = Quasar.QBtn;

describe('Index.vue', () => {
  const wrapper = mountQuasar(Index);
  const vm = wrapper.vm;

  it('is instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has the expected component name', () => {
    expect(vm.$options.name).toBe('LandingPage');
  });

  it('has an expected class on the wrapper DOM node', () => {
    expect(wrapper.classes('landing-page')).toBe(true);
  });

  it('contains two QBtn components', () => {
    expect(wrapper.findAllComponents(QBtn)).toHaveLength(2);
  });
});
