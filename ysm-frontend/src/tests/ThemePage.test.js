import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Card } from '@material-ui/core';
import ThemePage from '../pages/themes/[slug]';
import themes from './fixtures/themes';
import allResources from './fixtures/resources';
import ResourceCard from '../components/ResourceCard';

describe('ThemePage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    jest.clearAllMocks();
    shallow = createShallow();
  });

  it('renders with correct number of links when theme and resources are both not empty', () => {
    const theme = themes[0];
    const resources = allResources.filter(
      (resource) => resource.themes && resource.themes.includes(theme.id),
    );

    wrapper = shallow(
      <ThemePage
        theme={theme}
        resources={resources}
      />,
    ).dive();

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.find(ResourceCard)).toHaveLength(2);
  });

  it('displays no cards when theme does not exist', () => {
    wrapper = shallow(
      <ThemePage />,
    ).dive();

    expect(wrapper.find(Card)).toHaveLength(0);
  });

  it('displays only the header card when theme exists, but resources does not', () => {
    const theme = themes[0];
    wrapper = shallow(
      <ThemePage
        theme={theme}

      />,
    ).dive();

    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
