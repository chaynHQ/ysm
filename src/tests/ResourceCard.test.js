import { Avatar, Typography } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import ResourceCard from '../components/ResourceCard';

Router.useRouter = jest.fn();
Router.useRouter.mockImplementation(() => ({ route: '/resource/', query: { resource_slug: 'resource_slug' } }));

describe('ResourceContents', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with an image', () => {
    wrapper = shallow(
      <ResourceCard
        title="title"
        subtitle="subtitle"
        image={{ alt: 'alt text', filename: 'https://image.png' }}
        slug="slug"
        savingRedirectUrl="url"
      />,
    );

    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });

  it('renders without an image', () => {
    wrapper = shallow(
      <ResourceCard
        title="title"
        subtitle="subtitle"
        slug="slug"
        savingRedirectUrl="url"
      />,
    );

    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });
});
