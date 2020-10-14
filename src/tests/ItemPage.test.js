import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import Item from '../components/Item';
import ItemPage from '../pages/resources/[resourceSlug]/items/[itemId]';
import resources from './fixtures/resources';

describe('ItemPage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with a next item', () => {
    const resource = resources.find((r) => r.slug === 'resource-with-notes');
    const item = resource.content.find((i) => i.id === '1');
    const nextItem = resource.content[resource.content.findIndex(
      (i) => i.id === '1',
    ) + 1];

    wrapper = shallow(
      <ItemPage resource={resource} item={item} nextItem={nextItem} />,
    );

    expect(wrapper.html()).toContain('Continue:');
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders without a next item', () => {
    const resource = resources.find((r) => r.slug === 'resource-with-notes');
    const item = resource.content.find((i) => i.id === '2');
    const nextItem = resource.content[resource.content.findIndex(
      (i) => i.id === '2',
    ) + 1];

    wrapper = shallow(
      <ItemPage resource={resource} item={item} nextItem={nextItem} />,
    );

    expect(wrapper.html()).toContain('That was the last note on: ');
    expect(wrapper.find(Item)).toHaveLength(1);
  });
});
