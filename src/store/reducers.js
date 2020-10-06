import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import {
  SET_PROFILE, SET_RESOURCE, SET_RESOURCES, SET_SETTINGS_AUTH, SET_THEMES, SET_USER_SIGNIN,
} from './types';

const themes = (state = [], action) => {
  switch (action.type) {
    case HYDRATE:
      // TODO: Hydrate this properly like with resources
      return action.payload.themes;
    case SET_THEMES:
      return action.data;
    default:
      return state;
  }
};

const resources = (state = [], action) => {
  let nextState = [];
  switch (action.type) {
    case HYDRATE:
      nextState = action.payload.resources;
      state.forEach((resource) => {
        if (nextState.filter((r) => r.id === resource.id).length === 0) {
          nextState.push(resource);
        }
      });
      return nextState;
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
  let nextState = {};
  switch (action.type) {
    case HYDRATE:
      nextState = {
        ...state, // use previous state
        ...action.payload.user, // apply delta from hydration
      };
      if (state.user) {
        nextState.user = state.user;
      } // preserve user value on client side navigation
      return nextState;
    case SET_USER_SIGNIN:
      return { ...action.data };
    case SET_SETTINGS_AUTH:
      return { ...state, settingsAuth: action.data };
    case SET_PROFILE:
      return { ...state, ...action.data };
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
