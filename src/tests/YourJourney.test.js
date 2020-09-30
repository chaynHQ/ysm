import { Card } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { useSelector } from 'react-redux';
import YourJourney from '../pages/your-journey';
import themes from './fixtures/themes';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('YourJourney', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    useSelector.mockImplementation((callback) => callback({ themes }));
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <YourJourney />,
    );
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(themes.length);
  });
});
