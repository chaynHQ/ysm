import { axiosInstance } from 'boot/axios';
import _cloneDeep from 'lodash-es/cloneDeep';
import _isEmpty from 'lodash-es/isEmpty';
import _keyBy from 'lodash-es/keyBy';
import _uniq from 'lodash-es/uniq';
import {
  APPLY_FILTER,
  CLEAR_ALL_FILTERS,
  FETCH_FILTER_OPTIONS,
  FETCH_RESOURCE,
  FETCH_RESOURCES,
  UNAPPLY_FILTER,
} from './actions.types';
import { SET_FILTERS, SET_FILTER_OPTIONS, SET_RESOURCE, SET_RESOURCES } from './mutations.types';

export default {
  async [FETCH_FILTER_OPTIONS]({ state, commit }) {
    // Only fetch them if we don't already have them.
    // This means once we fetch them we cache them for the lifetime of the app instance. (We may want to add a time based expiry later).
    if (!_isEmpty(state.filterOptions)) {
      return Promise.resolve();
    }

    const response = await axiosInstance.get('resources/filters');
    const optionsMap = _keyBy(response.data, 'field');
    commit(SET_FILTER_OPTIONS, optionsMap);
  },

  async [APPLY_FILTER]({ state, dispatch, commit }, { field, value }) {
    const filters = _cloneDeep(state.filters);

    if (filters[field]) {
      filters[field].push(value);
      filters[field] = _uniq(filters[field]);
    } else {
      filters[field] = [value];
    }

    commit(SET_FILTERS, filters);

    return dispatch(FETCH_RESOURCES);
  },

  async [UNAPPLY_FILTER]({ state, dispatch, commit }, { field, value }) {
    const filters = _cloneDeep(state.filters);

    if (filters[field]) {
      filters[field] = filters[field].filter((i) => i !== value);
    }

    commit(SET_FILTERS, filters);

    return dispatch(FETCH_RESOURCES);
  },

  async [CLEAR_ALL_FILTERS]({ state, dispatch, commit }) {
    commit(SET_FILTERS, {});

    return dispatch(FETCH_RESOURCES);
  },

  async [FETCH_RESOURCES]({ state, commit }) {
    const params = _isEmpty(state.filters) ? undefined : { filters: state.filters };
    const response = await axiosInstance.get('resources', { params });
    commit(SET_RESOURCES, response.data);
  },

  async [FETCH_RESOURCE]({ commit }, slug) {
    const response = await axiosInstance.get(`resources/${slug}`);
    commit(SET_RESOURCE, response.data);
  },
};
