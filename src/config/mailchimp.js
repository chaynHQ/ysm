import mailchimp from '@mailchimp/mailchimp_marketing';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

mailchimp.setConfig({
  apiKey: publicRuntimeConfig.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: publicRuntimeConfig.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
});

export default mailchimp;
