import getConfig from 'next/config';
import Rollbar from 'rollbar';

const { publicRuntimeConfig } = getConfig();
const rollbarEnv = publicRuntimeConfig.NEXT_PUBLIC_ROLLBAR_ENV;
const rollbarToken = publicRuntimeConfig.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN;

const rollbar = new Rollbar({
  accessToken: rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: rollbarToken !== 'false',
  environment: rollbarEnv,
});

export default rollbar;
