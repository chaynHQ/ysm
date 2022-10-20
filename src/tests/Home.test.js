import { mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
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

  xit('renders with correct number of links', () => {
    expect(wrapper.find(Home).find('a')).toHaveLength(1);
  });
});
