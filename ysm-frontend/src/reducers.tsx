import { combineReducers } from 'redux';
import { richTextHelper} from './shared/rich-text'
import {
  SET_THEMES,
} from './actions';


const themes = (state = [], action: any) => {
  let newState: { content: any; id: any; slug: any; title: any; }[] = [];
  switch (action.type) {
    case SET_THEMES:
      action.data.forEach((data: any)=> {
        newState.push({
          content: richTextHelper(data.description),
        id: data.id,
      slug: data.slug,
    title: data.title})
      })
      return newState;
    default:
      return state;
  }
};

const ysmApp = combineReducers({
  themes,

});

export default ysmApp;
