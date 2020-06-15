import * as Quasar from 'quasar';
import { mountQuasar } from '~/test/jest/utils';
import ContentItem from './ContentItem.vue';

const QCard = Quasar.QCard;

describe('components/resources/ContentItem.vue', () => {
  const wrapper = mountQuasar(ContentItem, {
    propsData: { item: {} },
  });
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('ContentItem');
  });

  it('should contain a QCard component', () => {
    expect(wrapper.findAllComponents(QCard)).toHaveLength(1);
  });
});
