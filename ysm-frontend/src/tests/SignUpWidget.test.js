import { createShallow } from '@material-ui/core/test-utils';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import SignUpWidget from '../components/SignUpWidget';

const mockStore = configureMockStore();

describe('SignUpWidget', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders the signup box', () => {
    wrapper = shallow(
      <SignUpWidget
        store={mockStore({ user: {}})}
      />,
    ).dive().dive();

    console.log(wrapper.debug())
    expect(wrapper.find(Box)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(2)
  });

});
