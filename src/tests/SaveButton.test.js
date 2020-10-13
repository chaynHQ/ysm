import { Button, IconButton } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import mockAxios from 'axios';
import * as Router from 'next/router';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import SaveButton from '../components/SaveButton';

const mockStore = configureMockStore();

Router.useRouter = jest.fn();
Router.useRouter.mockImplementation(() => ({
  route: '/resource/',
  query: { resource_slug: 'resource_slug' },
  push: jest.fn(),
}));

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    route: '/resource/',
    query: { resource_slug: 'resource_slug' },
  }),
}));

describe("SaveButton when resource isn't saved", () => {
  let wrapper;
  let shallow;
  const setBookmarkOnClick = jest.fn();
  setBookmarkOnClick.mockImplementation(() => {});

  beforeEach(() => {
    shallow = createShallow();
    mockAxios.put.mockImplementationOnce(() => Promise.resolve({}));
  });

  it("renders a button when resource isn't saved", () => {
    const store = mockStore({ user: { xa: 'some-token' } });
    wrapper = shallow(
      <SaveButton
        resourceSlug="resource_slug"
        redirectUrl="redirect_slug"
        store={store}
      />,
    ).dive().dive();
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('dispatches if signed in', () => {
    const store = mockStore({ user: { xa: 'some-token' } });
    wrapper = shallow(
      <SaveButton
        resourceSlug="resource_slug"
        redirectUrl="redirect_slug"
        store={store}
        setBookmarkOnClick={setBookmarkOnClick()}
      />,
    ).dive().dive();
    wrapper.find(Button).simulate('click');
    expect(setBookmarkOnClick.mock.calls.length).toBe(1);
  });
});

describe('SaveButton when resource is saved', () => {
  let wrapper;
  let shallow;

  const deleteBookmarkOnClick = jest.fn();
  deleteBookmarkOnClick.mockImplementationOnce(() => { });

  beforeEach(() => {
    shallow = createShallow();
    const store = mockStore({ user: { xa: 'some-token', bookmarkedResources: ['resource_slug'] } });
    mockAxios.delete.mockImplementationOnce(() => Promise.resolve({}));

    wrapper = shallow(
      <SaveButton
        resourceSlug="resource_slug"
        redirectUrl="redirect_slug"
        store={store}
        deleteBookmarkOnClick={deleteBookmarkOnClick()}
      />,
    ).dive().dive();
  });

  it('dispatches on click', () => {
    wrapper.find(IconButton).simulate('click');
    expect(deleteBookmarkOnClick.mock.calls.length).toBe(1);
  });

  it('renders an IconButton when resource is saved', () => {
    expect(wrapper.find(IconButton)).toHaveLength(1);
  });
});
