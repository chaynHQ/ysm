import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';

const axiosInstance = axios.create({
  baseURL: '/api',
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'comma' });
  },
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
