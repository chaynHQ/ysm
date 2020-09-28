import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { Card } from '@material-ui/core';
import Privacy from '../pages/privacy';
import staticPage from './fixtures/staticPage';

describe('Privacy', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <Privacy
        content={staticPage}
      />,
    ).dive();

    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
