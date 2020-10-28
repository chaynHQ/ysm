import { Card } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import YourJourney from '../pages/your-journey';
import themes from './fixtures/themes';

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

describe('YourJourney', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <YourJourney
        propThemes={themes}
        container={{}}
      />,
    );

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(themes.length);
  });
});
