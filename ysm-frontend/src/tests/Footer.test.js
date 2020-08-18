import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Footer from '../components/Footer';

const mockStore = configureMockStore();

describe('Footer', () => {
  const store = mockStore({});
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Footer
          store={store}
        />
      </BrowserRouter>,
    );
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(Footer).find('a')).toHaveLength(4);
  });
});
