import configureMockStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { BottomNavigationAction } from '@material-ui/core';
import Footer from '../components/Footer';

const mockStore = configureMockStore();
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/your-journey',
  }),
}));

describe('Footer', () => {
  const store = mockStore({});
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();

    wrapper = shallow(
      <Footer
        store={store}
      />,
    );
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(BottomNavigationAction)).toHaveLength(4);
  });
});
