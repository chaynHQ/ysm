import axios from 'axios';
import getConfig from 'next/config';
import rollbar from './rollbar';

const { publicRuntimeConfig } = getConfig();

let baseUrl = '';
if (publicRuntimeConfig && publicRuntimeConfig.BASE_URL) {
  if (publicRuntimeConfig.BASE_URL) {
    baseUrl = publicRuntimeConfig.BASE_URL;
  } else {
    throw new Error('BASE_URL env variable missing');
  }
  if (!/^https?:\/\//i.test(baseUrl)) {
    baseUrl = `https://${baseUrl}`;
  }
}

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/`,
});

export const axiosGet = async (url, options) => {
  try {
    const response = await axiosInstance.get(url, options);
    return response.data;
  } catch (err) {
    if (err.response.status === 404) {
      return { status: 404, message: 'Not Found' };
    }
    rollbar.error('error in axios GET', err);
    throw err;
  }
};

export const axiosPut = async (url, data, options) => {
  try {
    const response = await axiosInstance.put(url, data, options);
    return response.data;
  } catch (err) {
    rollbar.error('error in axios PUT', err);
    throw err;
  }
};

export const axiosDelete = async (url, options) => {
  try {
    const response = await axiosInstance.delete(url, options);
    return response.data;
  } catch (err) {
    rollbar.error('error in axios DELETE', err);
    throw err;
  }
};
export default axiosInstance;
