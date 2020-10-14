import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import Item from '../components/Item';
import ResourceContents from '../components/ResourceContents';
import ResourcePage from '../pages/resources/[resourceSlug]';
import resources from './fixtures/resources';
import themes from './fixtures/themes';

describe('Resource Slug Page', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders when there is one resource', () => {
    const resource = resources.find((r) => r.slug === 'mental-health-services');
    const theme = themes[0];

    wrapper = shallow(
      <ResourcePage resource={resource} theme={theme} />,
    );
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('renders when there are two resources', () => {
    const resource = resources.find((r) => r.slug === 'mental-health-services-no-image');
    const theme = themes[0];

    wrapper = shallow(
      <ResourcePage resource={resource} theme={theme} />,
    );

    expect(wrapper.find(ResourceContents)).toHaveLength(1);
  });
});
