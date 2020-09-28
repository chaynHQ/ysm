import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { Card } from '@material-ui/core';
import About from '../pages/about';
import staticPage from './fixtures/staticPage';

describe('About', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <About
        content={staticPage}
      />,
    ).dive();

    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
