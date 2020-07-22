import { combineReducers } from 'redux';
import { isMobile } from 'react-device-detect';
import {
  ADD_USER_INPUT,
} from './actions';


const resources = (state = [], action: any) => {
  switch (action.type) {
    case ADD_USER_INPUT:
      return [];
    default:
      return state;
  }
};

const ysmApp = combineReducers({
  resources,

});

export default ysmApp;
