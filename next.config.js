module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
  },
  transpilePackages: ['react-hotjar'],
};
