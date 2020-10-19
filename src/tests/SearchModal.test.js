import { IconButton, TextField, Typography } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import SearchModal from '../components/SearchModal';

describe('SearchModal', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <SearchModal
        container={{}}
        closeModal={() => jest.fn()}
      />,
    );

    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
  });
});
