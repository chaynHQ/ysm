import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import * as Router from 'next/router';
import ItemPage from '../pages/resource/[resourceSlug]/item/[itemId]';
import Item from '../components/Item';

import resources from './fixtures/resources';

Router.useRouter = jest.fn();
Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resource_slug: 'resource_slug' } }));

describe('ItemPage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with a next item', () => {
    wrapper = shallow(
      <ItemPage
        item={resources[2].content[0]}
        resourceTitle="Resource Title"
        resourceSlug="resource_slug"
        nextItem={resources[2].content[1]}
      />,
    );

    expect(wrapper.html()).toContain('Continue:');
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders without a next item', () => {
    wrapper = shallow(
      <ItemPage
        item={resources[2].content[0]}
        resourceTitle="Resource Title"
        resourceSlug="resource_slug"
      />,
    );

    expect(wrapper.html()).toContain('That was the last note on: ');
    expect(wrapper.find(Item)).toHaveLength(1);
  });
});
