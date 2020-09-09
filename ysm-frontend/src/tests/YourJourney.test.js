import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Card } from '@material-ui/core';
import YourJourney from '../pages/your-journey';
import themes from './fixtures/themes';

describe('YourJourney', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <YourJourney
        themes={themes}
      />,
    ).dive();

    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(themes.length);
  });
});
