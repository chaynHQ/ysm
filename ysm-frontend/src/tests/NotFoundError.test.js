import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import NotFoundError from '../components/NotFoundError';

describe('NotFoundError', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();

    wrapper = shallow(
      <NotFoundError />,
    );
  });

  it('renders with correct word', () => {
    expect(wrapper.contains('404'));
  });
});
