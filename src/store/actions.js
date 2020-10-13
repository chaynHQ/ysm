import axiosInstance from './axios';
import {
  DELETE_BOOKMARK,
  SET_BOOKMARK,
  SET_PROFILE,
  SET_RESOURCE,
  SET_RESOURCES,
  SET_SETTINGS_AUTH,
  SET_THEMES,
  SET_USER_SIGNIN,
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
export const setResource = (data) => ({
  type: SET_RESOURCE,
  data,
});
export const setProfile = (data) => ({
  type: SET_PROFILE,
  data,
});

export const deleteBookmark = (data) => ({
  type: DELETE_BOOKMARK,
  data,
});

export const setBookmark = (data) => ({
  type: SET_BOOKMARK,
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
      return response.data;
    } catch (err) {
      console.log('error fetching resources');
      console.log(err);

      throw err;
    }
  };
}
export function fetchResource(slug) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`resources/${slug}`);
      dispatch(setResource(response.data));
      return response.data;
    } catch (err) {
      console.log('error fetching single resource');
      console.log(err);

      throw err;
    }
  };
}

export function fetchThemes() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('themes');
      await dispatch(setThemes(response.data));
      return response.data;
    } catch (err) {
      console.log('error fetching themes');
      console.log(err);
      throw err;
    }
  };
}

export function fetchProfile(token) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('profile',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      await dispatch(setProfile(response.data));
      return response.data;
    } catch (err) {
      console.log('error fetching profile');
      console.log(err);
      throw err;
    }
  };
}
