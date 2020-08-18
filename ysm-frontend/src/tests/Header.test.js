import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';

const mockStore = configureMockStore();

describe('Header', () => {
  const store = mockStore({});
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Header
          store={store}
        />
      </BrowserRouter>,
    );
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(Header).find('button')).toHaveLength(2);
  });
});
