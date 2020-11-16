import { Card } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import InfoPage from '../pages/info/[slug]';
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

Router.useRouter = jest.fn();

describe('InfoPage', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    Router.useRouter.mockImplementation(() => ({ route: '/info/slug', query: { slug: 'slug' } }));
  });

  it('renders with correct number of cards', () => {
    wrapper = shallow(
      <InfoPage
        propContent={staticPage}
      />,
    );

    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
