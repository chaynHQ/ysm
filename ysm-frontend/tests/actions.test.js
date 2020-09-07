import mockAxios from 'axios';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../store/types';
import * as actions from '../store/actions';

import themes from './fixtures/themes';
import resources from './fixtures/resources';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action creators', () => {
  it('should create an action to set the themes', () => {
    const expectedAction = {
      type: types.SET_THEMES,
      data: themes,
    };
    expect(actions.setThemes(themes)).toEqual(expectedAction);
  });
  it('should create an action to set the resources', () => {
    const expectedAction = {
      type: types.SET_RESOURCES,
      data: resources,
    };
    expect(actions.setResources(resources)).toEqual(expectedAction);
  });
  it('should create an action to set the users bookmakrs', () => {
    const bookmarks = {

    };
    const expectedAction = {
      type: types.SET_BOOKMARKS,
      data: bookmarks,
    };
    expect(actions.setBookmarks(bookmarks)).toEqual(expectedAction);
  });
  it('should create an action to set the signed in user', () => {
    const user = {};
    const expectedAction = {
      type: types.SET_USER_SIGNIN,
      data: user,
    };
    expect(actions.setUserSignIn(user)).toEqual(expectedAction);
  });
  it('should create an action to set the settings auth', () => {
    const settingsAuth = true;
    const expectedAction = {
      type: types.SET_SETTINGS_AUTH,
      data: settingsAuth,
    };
    expect(actions.setSettingsAuth(settingsAuth)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  it('creates SET_RESOURCES when fetching resources has been done', async () => {
    const expectedActions = [{
      type: types.SET_RESOURCES,
      data: resources,
    },
    ];
    const store = mockStore({ resources });
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: resources }));

    return store.dispatch(actions.fetchResources()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_BOOKMARKS when fetching bookmarks has been done', async () => {
    const bookmarks = {

    };

    const expectedActions = [{
      type: types.SET_BOOKMARKS,
      data: bookmarks,
    },
    ];
    const store = mockStore({ user: {} });
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

    return store.dispatch(actions.fetchBookmarks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_THEMES when fetching themes has been done', async () => {
    const expectedActions = [{
      type: types.SET_THEMES,
      data: themes,
    },
    ];
    const store = mockStore({ themes });
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: themes }));

    return store.dispatch(actions.fetchThemes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
