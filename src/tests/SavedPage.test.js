import { Typography } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import SavedPage from '../pages/saved';

const mockStore = configureMockStore();

describe('Saved Resources Page', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders when signed in but there are no resources yet', () => {
    const store = mockStore({ user: { xa: 'some-token' } });
    wrapper = shallow(
      <SavedPage
        store={store}
      />,
    ).dive().dive();

    expect(wrapper.find(Typography)).toHaveLength(3);
  });

  it('renders when not signed in', () => {
    const store = mockStore({ user: {} });
    wrapper = shallow(
      <SavedPage
        store={store}
      />,
    ).dive().dive();

    expect(wrapper.find(Typography)).toHaveLength(3);
  });
});
