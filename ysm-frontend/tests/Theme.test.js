import configureMockStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import thunk from 'redux-thunk';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Card } from '@material-ui/core';
import Theme from '../components/Theme';
import themes from './fixtures/themes';
import resources from './fixtures/resources';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Theme', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    jest.clearAllMocks();
    shallow = createShallow();
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders with correct number of links when theme and resources are both not empty', () => {
    wrapper = shallow(
      <Theme
        store={mockStore({ themes, resources })}
        match={{
          params: {
            themeSlug: themes[0].slug,
          },
        }}
      />,
    ).dive().dive();

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(3);
    // One for the theme, two for the resources that have the matching theme
  });

  it('displays no cards when theme does not exist', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

    const store = mockStore({ themes, resources });

    wrapper = shallow(
      <Theme
        store={store}
        match={{
          params: {
            themeSlug: 'FakeTheme',
          },
        }}
      />,
    ).dive().dive();

    expect(wrapper.find(Card)).toHaveLength(0);
  });

  it('displays only the header card when theme exists, but resources does not', () => {
    wrapper = shallow(
      <Theme
        store={mockStore({ themes, resources: [] })}
        match={{
          params: {
            themeSlug: themes[0].slug,
          },
        }}
      />,
    ).dive().dive();

    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
