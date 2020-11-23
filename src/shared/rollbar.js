import getConfig from 'next/config';
import Rollbar from 'rollbar';

const { publicRuntimeConfig } = getConfig();
const rollbarToken = publicRuntimeConfig.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN;
const rollbarEnv = publicRuntimeConfig.NEXT_PUBLIC_ROLLBAR_ENV;

const rollbar = new Rollbar({
  accessToken: rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: rollbarToken !== 'false',
  environment: rollbarEnv,
});

export default rollbar;
