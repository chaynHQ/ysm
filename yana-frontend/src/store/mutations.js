import _keyBy from 'lodash/keyBy';
import { SET_FILTERS, SET_FILTER_OPTIONS, SET_RESOURCE, SET_RESOURCES } from './mutations.types';

export default {
  [SET_FILTER_OPTIONS](state, options) {
    state.filterOptions = _keyBy(options, 'field');
  },

  [SET_FILTERS](state, filters) {
    state.filters = filters;
  },

  [SET_RESOURCES](state, resources) {
    state.resources = resources;
  },

  [SET_RESOURCE](state, resource) {
    state.resource = resource;
  },
};
