import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN : null,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: (process.env.NODE_ENV === 'production'),
});

export default rollbar;
