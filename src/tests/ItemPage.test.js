import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import Item from '../components/Item';
import ItemPage from '../pages/resources/[resourceSlug]/items/[itemId]';
import resources from './fixtures/resources';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
    .mockReturnValueOnce({ user: { xa: 'some-token' } }),
}));

jest.mock('../config/firebase');

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => ([
    undefined, {}, {}]
  ),
}));

Router.useRouter = jest.fn();

describe('ItemPage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with a next item', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resources/resource-with-notes/items/1', query: { resource_slug: 'resource-with-notes', itemId: '1' } }));
    const resource = resources.find((r) => r.slug === 'resource-with-notes');

    wrapper = shallow(
      <ItemPage propResource={resource} />,
    );

    expect(wrapper.html()).toContain('Continue:');
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders without a next item', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resources/resource-with-notes/items/2', query: { resource_slug: 'resource-with-notes', itemId: '2' } }));

    const resource = resources.find((r) => r.slug === 'resource-with-notes');

    wrapper = shallow(
      <ItemPage propResource={resource} />,
    );

    expect(wrapper.html()).toContain('That was the last note on: ');
    expect(wrapper.find(Item)).toHaveLength(1);
  });
});
