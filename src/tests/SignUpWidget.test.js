import { Box, Typography } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import SignUpWidget from '../components/SignUpWidget';

const mockStore = configureMockStore();

jest.mock('../config/firebase');

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => ([
    undefined, {}, {}]
  ),
}));

describe('SignUpWidget', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders the signup box', () => {
    wrapper = shallow(
      <SignUpWidget
        store={mockStore({ user: {} })}
      />,
    ).dive().dive();

    expect(wrapper.find(Box)).toHaveLength(3);
    expect(wrapper.find(Typography)).toHaveLength(2);
  });
});
