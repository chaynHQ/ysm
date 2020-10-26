import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ENV === 'production' ? process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN : false,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: (process.env.ROLLBAR_ENV === 'production'),
});

export default rollbar;
