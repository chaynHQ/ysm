import axiosInstance from './axios';
import {
  SET_THEMES, SET_RESOURCES, SET_USER_SIGNIN, SET_SETTINGS_AUTH, SET_BOOKMARKS,
} from './types';

/*
 * action creators
 */
export const setThemes = (data) => ({
  type: SET_THEMES,
  data,
});
export const setResources = (data) => ({
  type: SET_RESOURCES,
  data,
});
export const setBookmarks = (data) => ({
  type: SET_BOOKMARKS,
  data,
});
export const setUserSignIn = (data) => ({
  type: SET_USER_SIGNIN,
  data,
});

export const setSettingsAuth = (data) => ({
  type: SET_SETTINGS_AUTH,
  data,
});

export function fetchResources() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('resources');
      dispatch(setResources(response.data));
    } catch (err) {
      console.log(err);
      console.log('error');
    }
  };
}
export function fetchBookmarks() {
  return async (dispatch, getState) => {
    try {
      const response = await axiosInstance.get('profile',
        {
          headers: {
            authorization: `Bearer ${getState().user.xa}`,
          },
        });
      dispatch(setBookmarks(response.data));
    } catch (err) {
      console.log('error');
      console.log(err);
    }
  };
}

export function fetchThemes() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('themes');
      dispatch(setThemes(response.data));
    } catch (err) {
      console.log('error');
      console.log(err);
    }
  };
}