import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Item from '../components/Item';
import ItemPage from '../pages/resource/[resourceSlug]/item/[itemId]';
import resources from './fixtures/resources';
import themes from './fixtures/themes';

Router.useRouter = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('ItemPage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    useSelector.mockImplementation((callback) => callback({ themes, resources }));
  });

  it('renders with a next item', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resourceSlug: 'resource-with-notes', itemId: '1' } }));

    wrapper = shallow(
      <ItemPage />,
    );

    expect(wrapper.html()).toContain('Continue:');
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders without a next item', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resourceSlug: 'resource-with-notes', itemId: '2' } }));

    wrapper = shallow(
      <ItemPage />,
    );

    expect(wrapper.html()).toContain('That was the last note on: ');
    expect(wrapper.find(Item)).toHaveLength(1);
  });
});
