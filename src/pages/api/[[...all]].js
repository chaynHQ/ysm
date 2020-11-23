import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// TODO: Need to check for the existance of API_URL
export default createProxyMiddleware({
  target: publicRuntimeConfig.API_URL,
  changeOrigin: true,
});
