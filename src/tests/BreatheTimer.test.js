import { Button, IconButton } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import BreatheTimer from '../components/BreatheTimer';

describe('Header', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();

    wrapper = shallow(
      <BreatheTimer modalOpen setModalOpen={() => {}} />,
    ).dive();
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(IconButton)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
