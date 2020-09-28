import configureMockStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { IconButton, Drawer } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import Link from 'next/link';
import {
  Menu, Clear, Home, Info, MenuBook, AccountCircle, ExitToApp,
} from '@material-ui/icons';
import Header from '../components/Header';

const mockStore = configureMockStore();

describe('Header', () => {
  const store = mockStore({});
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();

    wrapper = shallow(
      <Header
        menuContainer={{}}
        store={store}
      />,
    ).dive().dive();
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(IconButton)).toHaveLength(3); // Open & close menu + search
    expect(wrapper.find(LinkUi)).toHaveLength(5); // Five links in the menu
    expect(wrapper.find(Link)).toHaveLength(5); // Five in the menu
  });

  it('opens and closes drawer on Exit app click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(true);
    wrapper.find(ExitToApp).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on Home click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(true);
    wrapper.find(Home).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on About click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(true);
    wrapper.find(Info).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on Privacy click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(true);
    wrapper.find(MenuBook).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on Profile click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(true);
    wrapper.find(AccountCircle).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on Close Menu click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(true);
    wrapper.find(Clear).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
});
