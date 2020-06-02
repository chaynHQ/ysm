import { mountQuasar } from '~/test/jest/utils';
import Index from './Index.vue';

describe('pages/resources/Index.vue', () => {
  const wrapper = mountQuasar(Index);
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('ResourcesPage');
  });

  it('should have an expected class on the wrapper DOM node', () => {
    expect(wrapper.classes('resources-page')).toBe(true);
  });
});
