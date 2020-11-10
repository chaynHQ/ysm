import { Button, Card, Link } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import Settings from '../pages/settings';

const mockStore = configureMockStore();
jest.mock('../config/firebase');
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => ([
    {}, {}, {}]
  ),
}));

describe('Settings Page', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders the signin box when settingsAuth is false', () => {
    wrapper = shallow(
      <Settings
        store={mockStore({ user: { settingsAuth: false } })}
      />,
    ).dive().dive().dive();

    expect(wrapper).toHaveLength(1);
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <Settings
        store={mockStore({ user: { settingsAuth: true } })}
      />,
    ).dive().dive();

    expect(wrapper.find(Card)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(3);
    expect(wrapper.find(Link)).toHaveLength(2);
  });
});
