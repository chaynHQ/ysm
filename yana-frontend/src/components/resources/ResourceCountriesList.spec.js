import * as Quasar from 'quasar';
import { mountQuasar } from '~/test/jest/utils';
import ResourceCountriesList from './ResourceCountriesList.vue';

const QChip = Quasar.QChip;

describe('components/resources/ResourceCountriesList.vue', () => {
  const wrapper = mountQuasar(ResourceCountriesList, {
    propsData: { countries: ['GLOBAL', 'GB'], mappings: {} },
  });
  const vm = wrapper.vm;

  it('should be instantiated', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have the expected component name', () => {
    expect(vm.$options.name).toBe('ResourceCountriesList');
  });

  it('should contains one QChip component per country', () => {
    expect(wrapper.findAllComponents(QChip)).toHaveLength(2);
  });
});
