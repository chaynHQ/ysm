import { combineReducers } from 'redux';
import {
  DELETE_BOOKMARK,
  SET_BOOKMARK,
  SET_PREVIEW_MODE,
  SET_SETTINGS_AUTH,
  SET_USER_SIGNIN,
} from './types';

const user = (state = {}, action) => {
  let bookmarkedResources = [];
  switch (action.type) {
    case SET_USER_SIGNIN:
      return { ...action.data };
    case SET_SETTINGS_AUTH:
      return { ...state, settingsAuth: action.data };
    case DELETE_BOOKMARK:
      bookmarkedResources = state.bookmarkedResources.filter((slug) => slug !== action.data);
      return { ...state, bookmarkedResources };
    case SET_BOOKMARK:
      bookmarkedResources = state.bookmarkedResources || [];
      if (bookmarkedResources.indexOf(action.data) < 0) {
        bookmarkedResources.push(action.data);
      }
      return { ...state, bookmarkedResources };
    case SET_PREVIEW_MODE:
      return { ...state, previewMode: action.data };
    default:
      return state;
  }
};

const ysmApp = combineReducers({
  user,
});

export default ysmApp;
