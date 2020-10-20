import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import SignUpPrompt from '../components/SignUpPrompt';

const mockStore = configureMockStore();

jest.mock('../config/firebase');

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => ([
    undefined, {}, {}]
  ),
}));

describe('SignUpPrompt', () => {
  const store = mockStore({});
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <SignUpPrompt
        store={store}
      />,
    ).dive();

    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
