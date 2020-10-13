import { combineReducers } from 'redux';
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

const themes = (state = [], action) => {
  switch (action.type) {
    case SET_THEMES:
      return action.data;
    default:
      return state;
  }
};

const resources = (state = [], action) => {
  switch (action.type) {
    case SET_RESOURCES:
      action.data.sort((a, b) => {
        if (a.featured === b.featured) {
          return 0;
        } if (a.featured) {
          return -1;
        } return 1;
      });
      return action.data;
    case SET_RESOURCE:
      state.push(action.data);
      return state;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  let bookmarkedResources = [];
  switch (action.type) {
    case SET_USER_SIGNIN:
      return { ...action.data };
    case SET_SETTINGS_AUTH:
      return { ...state, settingsAuth: action.data };
    case SET_PROFILE:
      return { ...state, ...action.data };
    case DELETE_BOOKMARK:
      bookmarkedResources = state.bookmarkedResources.filter((slug) => slug !== action.data);
      return { ...state, bookmarkedResources };
    case SET_BOOKMARK:
      bookmarkedResources = state.bookmarkedResources || [];
      if (bookmarkedResources.indexOf(action.data) < 0) {
        bookmarkedResources.push(action.data);
      }
      return { ...state, bookmarkedResources };
    default:
      return state;
  }
};

const ysmApp = combineReducers({
  themes,
  resources,
  user,
});

export default ysmApp;
