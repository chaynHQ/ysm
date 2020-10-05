import axios from 'axios';

// TODO: Need to check for existance of BASE_URL

let baseUrl = '';
if (process && process.env.BASE_URL) {
  baseUrl = process.env.BASE_URL;
  if (!/^https?:\/\//i.test(baseUrl)) {
    baseUrl = `https://${baseUrl}`;
  }
}

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/`,
});

// axiosInstance.interceptors.request.use((request) => {
//   console.log('Starting Request', request);
//   return request;
// });

// axiosInstance.interceptors.response.use((response) => {
//   console.log('Response:', response);
//   return response;
// });

export const axiosGet = async (url, options) => {
  try {
    const response = await axiosInstance.get(url, options);
    return response.data;
  } catch (err) {
    console.log('error in axios GET');
    console.log(err);
    throw err;
  }
};

export const axiosPut = async (url, data, options) => {
  console.log('IN AXIOS PuT');
  try {
    const response = await axiosInstance.put(url, data, options);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log('error in axios PUT');
    console.log(err);
    throw err;
  }
};
export default axiosInstance;
