import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// TODO: Need to check for the existance of API_URL
export default createProxyMiddleware({
  target: process.env.API_URL,
  changeOrigin: true,
});

// TODO FOR PREVIEW MODE, add a proxy in so that if preview mode is enabled we send the appropriate headers etc... to the backend
