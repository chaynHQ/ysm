import { singleResource } from '~/test/jest/fixtures/resources';
import { mountQuasar } from '~/test/jest/utils';
import Resource from './Resource.vue';

describe('pages/resources/Resource.vue', () => {
  const store = {
    state: {
      resource: singleResource,
    },
    getters: {
      filterOptionsForField: () => ({}),
    },
  };

  const wrapper = mountQuasar(Resource, { $store: store });
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('ResourcePage');
  });

  it('should have an expected class on the wrapper DOM node', () => {
    expect(wrapper.classes('resource-page')).toBe(true);
  });
});
