import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import * as Router from 'next/router';
import ResourceContents from '../components/ResourceContents';

import resources from './fixtures/resources';

Router.useRouter = jest.fn();
Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resource_slug: 'resource_slug' } }));

describe('ResourceContents', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders when there are two resources', () => {
    wrapper = shallow(
      <ResourceContents
        resource={resources[1]}
      />,
    );
    expect(wrapper.find('li')).toHaveLength(2);
  });
});
