import configureMockStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { IconButton } from '@material-ui/core';
import Header from '../components/Header';

const mockStore = configureMockStore();

describe('Header', () => {
  const store = mockStore({});
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();

    wrapper = shallow(
      <Header
        store={store}
      />,
    );
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(IconButton)).toHaveLength(2);
  });
});
