import configureMockStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import thunk from 'redux-thunk';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Card } from '@material-ui/core';
import YourJourney from '../components/YourJourney';
import themes from './fixtures/themes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('YourJourney', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <YourJourney
        store={mockStore({ themes })}
      />,
    ).dive().dive();

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(themes.length);
  });

  it('calls correct action on empty themes in store', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

    const store = mockStore({ themes: [] });
    const fetchThemesOnRenderMock = jest.fn();

    wrapper = shallow(
      <YourJourney
        store={store}
        fetchThemesOnRender={fetchThemesOnRenderMock()}
      />,
    );

    expect(fetchThemesOnRenderMock.mock.calls.length).toBe(1);
  });
});
