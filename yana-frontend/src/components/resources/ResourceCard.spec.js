import * as Quasar from 'quasar';
import { singleResource } from '~/test/jest/fixtures/resources';
import { mountQuasar } from '~/test/jest/utils';
import ResourceCard from './ResourceCard.vue';

const QCard = Quasar.QCard;

describe('components/resources/ResourceCard.vue', () => {
  const wrapper = mountQuasar(ResourceCard, {
    propsData: { resource: singleResource, countryMappings: {} },
  });
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('ResourceCard');
  });

  it('should contain a QCard component', () => {
    expect(wrapper.findAllComponents(QCard)).toHaveLength(1);
  });
});
