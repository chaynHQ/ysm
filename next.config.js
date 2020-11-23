module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_FIREBASE_KEY: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    NEXT_PUBLIC_FIREBASE_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
    NEXT_PUBLIC_ROLLBAR_ENV: process.env.NEXT_PUBLIC_ROLLBAR_ENV,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_MAILCHIMP_API_KEY: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
    NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
    NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
  },
};
