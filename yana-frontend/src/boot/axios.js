import axios from 'axios';
import Vue from 'vue';

const axiosInstance = axios.create({
  baseURL: '/api',
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
