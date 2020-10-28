import { Card } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import Privacy from '../pages/privacy';
import staticPage from './fixtures/staticPage';

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

describe('Privacy', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <Privacy
        propContent={staticPage}
      />,
    ).dive();

    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
