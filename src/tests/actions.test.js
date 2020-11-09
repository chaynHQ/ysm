import * as actions from '../store/actions';
import * as types from '../store/types';

describe('action creators', () => {
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

  it('should create an action to set a bookmark', () => {
    const bookmark = {};
    const expectedAction = {
      type: types.SET_BOOKMARK,
      data: bookmark,
    };
    expect(actions.setBookmark(bookmark)).toEqual(expectedAction);
  });

  it('should create an action to delete a bookmark', () => {
    const bookmark = {};
    const expectedAction = {
      type: types.DELETE_BOOKMARK,
      data: bookmark,
    };
    expect(actions.deleteBookmark(bookmark)).toEqual(expectedAction);
  });

  it('should create an action to set the preview mode', () => {
    const previewMode = true;
    const expectedAction = {
      type: types.SET_PREVIEW_MODE,
      data: previewMode,
    };
    expect(actions.setPreviewMode(previewMode)).toEqual(expectedAction);
  });
});
