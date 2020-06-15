import { singleResource } from '~/test/jest/fixtures/resources';
import { mountQuasar } from '~/test/jest/utils';
import ContentItem from './ContentItem.vue';

describe('pages/resources/ContentItem.vue', () => {
  const store = {
    state: {
      resource: singleResource,
    },
    getters: {
      contentItem: () => singleResource.content[0],
      previousContentItem: () => null,
      nextContentItem: () => null,
    },
  };

  const wrapper = mountQuasar(ContentItem, { $store: store });
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('ContentItemPage');
  });

  it('should have an expected class on the wrapper DOM node', () => {
    expect(wrapper.classes('content-item-page')).toBe(true);
  });
});
