import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Item from '../components/Item';
import ResourceContents from '../components/ResourceContents';
import ResourcePage from '../pages/resource/[resourceSlug]';
import resources from './fixtures/resources';
import themes from './fixtures/themes';

Router.useRouter = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Resource Slug Page', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    useSelector.mockImplementation((callback) => callback({ themes, resources }));
  });

  it('renders when there is one resource', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resourceSlug: 'mental-health-services' } }));

    wrapper = shallow(
      <ResourcePage />,
    );
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders when there are two resources', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resourceSlug: 'mental-health-services-no-image' } }));

    wrapper = shallow(
      <ResourcePage />,
    );

    expect(wrapper.find(ResourceContents)).toHaveLength(1);
  });
});
