import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import ResourceCard from '../components/ResourceCard';
import ThemePage from '../pages/themes/[slug]';
import richTextHelper from '../shared/rich-text';
import allThemes from './fixtures/themes';

jest.mock('../shared/rich-text');
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

describe('ThemePage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    jest.clearAllMocks();
    shallow = createShallow();
    richTextHelper.mockReturnValueOnce({
    });
  });

  // TODO: This does not work because useEffect is not called with shallow.
  // Consider including: https://www.npmjs.com/package/jest-react-hooks-shallow

  // it('renders with correct number of links when theme and resources are both not empty', () => {
  //   Router.useRouter.mockImplementation(() => ({
  //  route: '/themes/theme-with-resources', query: { slug: 'theme-with-resources' }
  // }));

  //   const theme = allThemes.find((t) => t.slug === 'theme-with-resources');
  //   const themes = allThemes.filter((t) => t.slug !== 'theme-with-resources');
  //   const resources = allResources.filter(
  //     (resource) => resource.themes && resource.themes.includes(theme.id),
  //   );

  //   wrapper = shallow(
  //     <ThemePage propThemes={themes} propResources={resources} container={{}} />,
  //   ).dive();

  //   expect(wrapper.find(Link)).toHaveLength(2);
  //   expect(wrapper.find(ResourceCard)).toHaveLength(2);
  // });

  // This test is therefore a bit of a red herring!
  it('displays no cards when theme does not exist', () => {
    Router.useRouter.mockImplementation(() => ({ route: '/themes/theme-that-doesnt-exist', query: { slug: 'theme-that-doesnt-exist' } }));
    const themes = allThemes.filter((t) => t.slug !== 'theme-that-doesnt-exist');

    wrapper = shallow(
      <ThemePage propThemes={themes} propResources={[]} container={{}} />,
    ).dive();

    expect(wrapper.find(ResourceCard)).toHaveLength(0);
  });

  // it('displays only the header when theme exists, but resources does not', () => {
  //   Router.useRouter.mockImplementation(() => (
  // { route: '/themes/theme-without-resources', query: { slug: 'theme-without-resources' }
  // }));
  //   const themes = allThemes.filter((t) => t.slug !== 'theme-without-resources');

  //   wrapper = shallow(
  //     <ThemePage propThemes={themes} propResources={[]} container={{}} />,
  //   ).dive();

  //   expect(wrapper.find(Typography)).toHaveLength(5);
  // });
});
