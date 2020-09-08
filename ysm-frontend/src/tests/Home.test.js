import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import React from 'react';
import Home from '../pages/index';

const mockStore = configureMockStore();

describe('Home', () => {
  const store = mockStore({});
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Home
        store={store}
      />,
    );
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(Home).find('a')).toHaveLength(1);
  });
});
