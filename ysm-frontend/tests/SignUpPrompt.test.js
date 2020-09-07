import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import SignUpPrompt from '../components/SignUpPrompt';

describe('SignUpPrompt', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('renders with correct number of links', () => {
    wrapper = shallow(
      <SignUpPrompt />,
    ).dive();

    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
