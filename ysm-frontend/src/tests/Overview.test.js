import configureMockStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import thunk from 'redux-thunk';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Button, Card } from '@material-ui/core';
import Overview from '../components/Overview';
import themes from './fixtures/themes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Overview', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <Overview
        store={mockStore({ themes })}
      />,
    ).dive().dive();

    expect(wrapper.find(Link)).toHaveLength(3);
    expect(wrapper.find(Card)).toHaveLength(themes.length);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('calls correct actions on minimise click', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

    const store = mockStore({ themes: [] });
    const fetchThemesOnRenderMock = jest.fn();

    wrapper = shallow(
      <Overview
        store={store}
        fetchThemesOnRender={fetchThemesOnRenderMock()}
      />,
    );

    expect(fetchThemesOnRenderMock.mock.calls.length).toBe(1);
  });
});
