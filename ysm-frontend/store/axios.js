import axios from 'axios';

// TODO: Need to check for existance of VERCEL_URL
const axiosInstance = axios.create({
  baseURL: `${process.env.VERCEL_URL}/api`,
});

axiosInstance.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

axiosInstance.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

export const axiosGet = async (url, headers) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.log('error');
    console.log(err);
  }
};
export default axiosInstance;