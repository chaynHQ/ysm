import { Drawer, IconButton } from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { createShallow } from '@material-ui/core/test-utils';
import {
  AccountCircle, Clear, ExitToApp, Home, Info, Menu,
} from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import Header from '../components/Header';

jest.mock('../config/firebase');
jest.mock('../shared/leave');

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => ([
    undefined, {}, {}]
  ),
}));
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
    ).dive();
  });

  it('renders with correct number of links', () => {
    expect(wrapper.find(IconButton)).toHaveLength(3); // Open & close menu + search
    expect(wrapper.find(LinkUi)).toHaveLength(7); // Six links in the menu + Header
    expect(wrapper.find(Link)).toHaveLength(6); // (One less because of leave site)
  });

  it('opens and closes drawer on Exit app click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.find(ExitToApp).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on Home click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.find(Home).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on About click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.find(Info).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });

  // TODO: Once the icon has settled for t's&c's add this back in
  // it('opens and closes drawer on Privacy click', () => {
  //   wrapper.find(Menu).closest(IconButton).simulate('click');
  //   wrapper.find(MenuBook).closest(LinkUi).simulate('click');
  //   wrapper.update();
  //   expect(wrapper.find(Drawer).props().open).toEqual(false);
  // });
  it('opens and closes drawer on Profile click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.find(AccountCircle).closest(LinkUi).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
  it('opens and closes drawer on Close Menu click', () => {
    wrapper.find(Menu).closest(IconButton).simulate('click');
    wrapper.find(Clear).closest(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Drawer).props().open).toEqual(false);
  });
});
