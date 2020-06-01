import { mountQuasar } from '~/test/jest/utils';

import App from './App.vue';

describe('App.vue', () => {
  const wrapper = mountQuasar(App);
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('App');
  });

  it('should have the expected ID for the wrapper DOM node', () => {
    expect(wrapper.attributes('id')).toBe('q-app');
  });
});
