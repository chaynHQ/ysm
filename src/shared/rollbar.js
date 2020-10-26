import Rollbar from 'rollbar';

const rollbarEnv = process.env.NEXT_PUBLIC_ROLLBAR_ENV;
const rollbarToken = process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN;

const rollbar = new Rollbar({
  accessToken: rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: rollbarToken !== 'false',
  environment: rollbarEnv,
});

export default rollbar;
