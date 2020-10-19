import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import ResourceCard from '../components/ResourceCard';
import ThemePage from '../pages/themes/[slug]';
import richTextHelper from '../shared/rich-text';
import allResources from './fixtures/resources';
import allThemes from './fixtures/themes';

jest.mock('../shared/rich-text');
describe('ThemePage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    jest.clearAllMocks();
    shallow = createShallow();
    richTextHelper.mockReturnValueOnce({
    });
  });

  it('renders with correct number of links when theme and resources are both not empty', () => {
    const theme = allThemes.find((t) => t.slug === 'theme-with-resources');
    const themes = allThemes.filter((t) => t.slug !== 'theme-with-resources');
    const resources = allResources.filter(
      (resource) => resource.themes && resource.themes.includes(theme.id),
    );

    wrapper = shallow(
      <ThemePage themes={themes} resources={resources} theme={theme} container={{}} />,
    ).dive();

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(ResourceCard)).toHaveLength(2);
  });

  it('displays no cards when theme does not exist', () => {
    const theme = allThemes.find((t) => t.slug === 'theme-that-doesnt-exist');
    const themes = allThemes.filter((t) => t.slug !== 'theme-that-doesnt-exist');

    wrapper = shallow(
      <ThemePage themes={themes} resources={[]} theme={theme} container={{}} />,
    ).dive();
    expect(wrapper.find(ResourceCard)).toHaveLength(0);
  });

  it('displays only the header when theme exists, but resources does not', () => {
    const theme = allThemes.find((t) => t.slug === 'theme-without-resources');
    const themes = allThemes.filter((t) => t.slug !== 'theme-without-resources');

    wrapper = shallow(
      <ThemePage themes={themes} resources={[]} theme={theme} container={{}} />,
    ).dive();

    expect(wrapper.find(Typography)).toHaveLength(5);
  });
});
