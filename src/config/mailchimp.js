import mailchimp from '@mailchimp/mailchimp_marketing';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
});

export default mailchimp;
