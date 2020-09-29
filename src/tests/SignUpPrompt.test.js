import { createShallow } from '@material-ui/core/test-utils';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import SignUpPrompt from '../components/SignUpPrompt';

const mockStore = configureMockStore();

describe('SignUpPrompt', () => {
  const store = mockStore({});
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <SignUpPrompt
        store={store}
      />,
    ).dive().dive();

    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
