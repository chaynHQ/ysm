import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { Avatar } from '@material-ui/core';
import ResourceCard from '../components/ResourceCard';

describe('Resource Card', () => {
  let wrapper;
  let shallow;
  const title = 'Title';
  const subtitle = 'Subtitle';
  const image = { filename: 'https://file.png', alt: 'Alt text' };

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with image if image provided', () => {
    wrapper = shallow(
      <ResourceCard
        title={title}
        subtitle={subtitle}
        image={image}
      />,
    );

    expect(wrapper.contains(title)).toEqual(true);
    expect(wrapper.contains(subtitle)).toEqual(true);
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });

  it('renders without image if image not provided', () => {
    wrapper = shallow(
      <ResourceCard
        title={title}
        subtitle={subtitle}
      />,
    );

    expect(wrapper.contains(title)).toEqual(true);
    expect(wrapper.contains(subtitle)).toEqual(true);
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });

  it('renders without subtitle if subtitle not provided', () => {
    wrapper = shallow(
      <ResourceCard
        title={title}
        image={image}
      />,
    );

    expect(wrapper.contains(title)).toEqual(true);
    expect(wrapper.contains(subtitle)).toEqual(false);
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});
