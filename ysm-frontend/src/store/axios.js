import axios from 'axios';

// TODO: Need to check for existance of VERCEL_URL

let baseUrl = '';
if (process && process.env.VERCEL_URL) {
  baseUrl = process.env.VERCEL_URL;
  if (!/^https?:\/\//i.test(baseUrl)) {
    baseUrl = `https://${baseUrl}`;
  }
}

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/`,
});

axiosInstance.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

axiosInstance.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

export const axiosGet = async (url, options) => {
  try {
    const response = await axiosInstance.get(url, options);
    return response.data;
  } catch (err) {
    console.log('error');
    console.log(err);
    throw err;
  }
};
export default axiosInstance;
