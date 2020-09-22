function missing(key: string): string {
  throw new Error(`Missing env var: ${key}`);
}

export interface Config {
  port: string | number;
  storyblok: {
    token: string;
  };
  firebase: {
    serviceAccount: Record<string, string>;
  };
  contentEditorEmails: string[];
}

export default (): Config => ({
  port: process.env.PORT || 3000,
  storyblok: {
    token: process.env.STORYBLOK_TOKEN || missing('STORYBLOK_TOKEN'),
  },
  firebase: {
    serviceAccount: getFirebaseServiceAccount(),
  },
  contentEditorEmails: getContentEditorEmails(),
});

function getFirebaseServiceAccount() {
  const data = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!data) {
    missing(
      'FIREBASE_SERVICE_ACCOUNT (must be a JSON object serialised into a string and then base64 encoded)',
    );
  }

  const decoded = Buffer.from(data, 'base64').toString('utf-8');
  return JSON.parse(decoded);
}

function getContentEditorEmails() {
  const value = process.env.CONTENT_EDITOR_EMAILS;

  if (!value && process.env.NODE_ENV !== 'test') {
    console.log(
      `No content editor emails configured. If you'd like to specify some approved content editors (who can view draft content) then set the env var CONTENT_EDITOR_EMAILS with a comma separated list of email addresses.`,
    );

    return [];
  }

  return value
    .split(',')
    .map((v) => v.toLowerCase().trim())
    .filter((v) => !!v);
}
