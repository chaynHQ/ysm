import { Button, IconButton } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import * as Router from 'next/router';
import React from 'react';
import * as redux from 'react-redux';
import { useSelector } from 'react-redux';
import SaveButton from '../components/SaveButton';

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

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("SaveButton when resource isn't saved", () => {
  let wrapper;
  let shallow;
  let mockDispatchFn;

  beforeEach(() => {
    shallow = createShallow();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
  });

  it('renders a button when resource is saved', () => {
    useSelector.mockImplementation((callback) => callback({ user: { xa: 'some-token' } }));

    wrapper = shallow(
      <SaveButton
        resourceSlug="resource_slug"
        redirectUrl="redirect_slug"
      />,
    );
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('dispatches if signed in', () => {
    useSelector.mockImplementation((callback) => callback({ user: { xa: 'some-token' } }));

    wrapper = shallow(
      <SaveButton
        resourceSlug="resource_slug"
        redirectUrl="redirect_slug"
      />,
    );
    wrapper.find(Button).simulate('click');
    expect(mockDispatchFn.mock.calls.length).toBe(1);
  });

  it('does not dispatch if not signed in', () => {
    useSelector.mockImplementation((callback) => callback({ user: {} }));

    wrapper = shallow(
      <SaveButton
        resourceSlug="resource_slug"
        redirectUrl="redirect_slug"
      />,
    );
    wrapper.find(Button).simulate('click');

    expect(mockDispatchFn.mock.calls.length).toBe(0);
  });
});

describe('SaveButton when resource is saved', () => {
  let wrapper;
  let shallow;
  let mockDispatchFn;

  beforeEach(() => {
    shallow = createShallow();
    useSelector.mockImplementation((callback) => callback({ user: { xa: 'some-token', bookmarkedResources: ['resource_slug'] } }));
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    wrapper = shallow(
      <SaveButton
        resourceSlug="resource_slug"
        redirectUrl="redirect_slug"
      />,
    );
  });

  it('renders an button when resource is saved', () => {
    expect(wrapper.find(IconButton)).toHaveLength(1);
  });

  it('dispatches on click', () => {
    wrapper.find(IconButton).simulate('click');
    expect(mockDispatchFn.mock.calls.length).toBe(1);
  });
});
