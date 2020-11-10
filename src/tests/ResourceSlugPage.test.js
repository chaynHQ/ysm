import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import Item from '../components/Item';
import ResourceContents from '../components/ResourceContents';
import ResourcePage from '../pages/resources/[resourceSlug]';
import resources from './fixtures/resources';
import themes from './fixtures/themes';

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

describe('Resource Slug Page', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders when there is one resource', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resource/mental-health-services', query: { resourceSlug: 'mental-health-services' } }));

    const resource = resources.find((r) => r.slug === 'mental-health-services');
    const theme = themes[0];

    wrapper = shallow(
      <ResourcePage propResource={resource} propTheme={theme} />,
    );
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders when there are two resources', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/resource/mental-health-services-no-image', query: { resourceSlug: 'mental-health-services-no-image' } }));

    const resource = resources.find((r) => r.slug === 'mental-health-services-no-image');
    const theme = themes[0];

    wrapper = shallow(
      <ResourcePage propResource={resource} propTheme={theme} />,
    );

    expect(wrapper.find(ResourceContents)).toHaveLength(1);
  });
});
