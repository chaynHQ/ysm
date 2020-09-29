import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import ResourceCard from '../components/ResourceCard';
import ThemePage from '../pages/themes/[slug]';
import richTextHelper from '../shared/rich-text';
import resources from './fixtures/resources';
import themes from './fixtures/themes';

jest.mock('../shared/rich-text');

Router.useRouter = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('ThemePage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    jest.clearAllMocks();
    shallow = createShallow();
    richTextHelper.mockReturnValueOnce({
    });
    useSelector.mockImplementation((callback) => callback({ themes, resources }));
  });

  it('renders with correct number of links when theme and resources are both not empty', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/theme/', query: { slug: 'theme-with-resources' } }));

    wrapper = shallow(
      <ThemePage />,
    ).dive();

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(ResourceCard)).toHaveLength(2);
  });

  it('displays no cards when theme does not exist', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/theme/', query: { slug: 'theme-that-doesnt-exist' } }));

    wrapper = shallow(
      <ThemePage />,
    ).dive();
    expect(wrapper.find(ResourceCard)).toHaveLength(0);
  });

  it('displays only the header when theme exists, but resources does not', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/theme/', query: { slug: 'theme-without-resources' } }));

    wrapper = shallow(
      <ThemePage />,
    ).dive();

    expect(wrapper.find(Typography)).toHaveLength(4);
  });
});
