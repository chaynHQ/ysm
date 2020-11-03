import {
  DELETE_BOOKMARK,
  SET_BOOKMARK,
  SET_PREVIEW_MODE,
  SET_SETTINGS_AUTH,
  SET_USER_SIGNIN,
} from './types';

/*
 * action creators
 */

export const deleteBookmark = (data) => ({
  type: DELETE_BOOKMARK,
  data,
});

export const setBookmark = (data) => ({
  type: SET_BOOKMARK,
  data,
});

export const setSettingsAuth = (data) => ({
  type: SET_SETTINGS_AUTH,
  data,
});

// TODO: Double check on preview mode if this is still needed!
export const setUserSignIn = (data) => ({
  type: SET_USER_SIGNIN,
  data,
});

export const setPreviewMode = (data) => ({
  type: SET_PREVIEW_MODE,
  data,
});
