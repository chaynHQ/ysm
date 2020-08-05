import axiosInstance from './axios';

/*
 * action types
 */
export const SET_THEMES = 'SET_THEMES';
export const SET_RESOURCES = 'SET_RESOURCES';
export const SET_USER_SIGNIN = 'SET_USER_SIGNIN';

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

export const setUserSignIn = (data) => ({
  type: SET_USER_SIGNIN,
  data,
});

export function fetchResources() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('resources');
      dispatch(setResources(response.data));
    } catch {
      console.log('error');
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
