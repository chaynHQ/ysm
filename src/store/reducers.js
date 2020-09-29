import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import {
  SET_BOOKMARKS, SET_RESOURCES, SET_SETTINGS_AUTH, SET_THEMES, SET_USER_SIGNIN,
} from './types';

const themes = (state = [], action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.themes;
    case SET_THEMES:
      return action.data;
    default:
      return state;
  }
};

const resources = (state = [], action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.resources;
    case SET_RESOURCES:
      action.data.sort((a, b) => {
        if (a.featured === b.featured) {
          return 0;
        } if (a.featured) {
          return -1;
        } return 1;
      });
      return action.data;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.user;
    case SET_USER_SIGNIN:
      return { ...state, ...action.data };
    case SET_SETTINGS_AUTH:
      return { ...state, settingsAuth: action.data };
    case SET_BOOKMARKS:
      return { ...state, bookmarks: action.data };
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
