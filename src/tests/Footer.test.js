import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { BottomNavigationAction } from '@material-ui/core';
import Footer from '../components/Footer';

describe('Footer', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();

    wrapper = shallow(
      <Footer />,
    );
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(BottomNavigationAction)).toHaveLength(4);
  });
});
