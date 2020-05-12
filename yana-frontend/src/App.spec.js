import { mountQuasar } from '~/test/jest/utils';

import App from './App.vue';

describe('App.vue', () => {
  const wrapper = mountQuasar(App);
  const vm = wrapper.vm;

  it('is instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has the expected component name', () => {
    expect(vm.$options.name).toBe('App');
  });

  it('has the expected ID for the wrapper DOM node', () => {
    expect(wrapper.attributes('id')).toBe('q-app');
  });
});
