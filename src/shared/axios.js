import axios from 'axios';
import rollbar from './rollbar';

// TODO: Need to check for existance of BASE_URL

let baseUrl = '';
if (process && process.env.BASE_URL) {
  if (process.env.BASE_URL) {
    baseUrl = process.env.BASE_URL;
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
