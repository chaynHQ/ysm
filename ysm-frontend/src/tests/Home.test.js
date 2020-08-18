import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from '../components/Home';

const mockStore = configureMockStore();

describe('Home', () => {
  const store = mockStore({});
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Home
          store={store}
        />
      </BrowserRouter>,
    );
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(Home).find('a')).toHaveLength(1);
  });
});
