import { SET_RESOURCE, SET_RESOURCES } from './mutations.types';

export default {
  [SET_RESOURCES](state, resources) {
    state.resources = resources;
  },
  [SET_RESOURCE](state, resource) {
    state.resource = resource;
  },
};
