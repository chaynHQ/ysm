import { combineReducers } from 'redux';
import richTextHelper from '../shared/rich-text';
import {
  SET_THEMES, SET_RESOURCES, SET_USER_SIGNIN, SET_SETTINGS_AUTH, SET_BOOKMARKS,
} from './types';

const themes = (state = [], action) => {
  const newState = [];
  switch (action.type) {
    case SET_THEMES:
      action.data.forEach((data) => {
        newState.push({
          description: richTextHelper(data.description),
          id: data.id,
          slug: data.slug,
          title: data.title,
        });
      });
      return newState;
    default:
      return state;
  }
};

const resources = (state = [], action) => {
  switch (action.type) {
    case SET_RESOURCES:
      return action.data;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
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
