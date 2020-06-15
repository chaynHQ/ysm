import * as Quasar from 'quasar';
import { singleResource } from '~/test/jest/fixtures/resources';
import { mountQuasar } from '~/test/jest/utils';
import ContentItemCard from './ContentItemCard.vue';

const QCard = Quasar.QCard;

describe('components/resources/ContentItemCard.vue', () => {
  const wrapper = mountQuasar(ContentItemCard, {
    propsData: { resourceSlug: 'foo', item: singleResource.content[0] },
  });
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('ContentItemCard');
  });

  it('should contain a QCard component', () => {
    expect(wrapper.findAllComponents(QCard)).toHaveLength(1);
  });
});
