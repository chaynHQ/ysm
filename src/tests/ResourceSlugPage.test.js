import { createShallow } from '@material-ui/core/test-utils';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import * as Router from 'next/router';
import ResourcePage from '../pages/resource/[resourceSlug]';
import Item from '../components/Item';
import ResourceContents from '../components/ResourceContents';

import resources from './fixtures/resources';
import themes from './fixtures/themes';

const mockStore = configureMockStore();

Router.useRouter = jest.fn();
Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resource_slug: 'resource_slug' } }));

describe('Resource Slug Page', () => {
  const store = mockStore({});
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders when there is one resource', () => {
    wrapper = shallow(
      <ResourcePage
        resource={resources[0]}
        theme={themes[0]}
        store={store}
      />,
    );
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders when there are two resources', () => {
    wrapper = shallow(
      <ResourcePage
        resource={resources[1]}
        theme={themes[0]}
        store={store}
      />,
    );

    expect(wrapper.find(ResourceContents)).toHaveLength(1);
  });
});
