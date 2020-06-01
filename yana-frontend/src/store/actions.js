import { axiosInstance } from 'boot/axios';

import { FETCH_RESOURCE, FETCH_RESOURCES } from './actions.types';
import { SET_RESOURCE, SET_RESOURCES } from './mutations.types';

export default {
  async [FETCH_RESOURCES]({ commit }) {
    const response = await axiosInstance.get('resources');
    commit(SET_RESOURCES, response.data);
  },
  async [FETCH_RESOURCE]({ commit }, slug) {
    const response = await axiosInstance.get(`resources/${slug}`);
    commit(SET_RESOURCE, response.data);
  },
};
