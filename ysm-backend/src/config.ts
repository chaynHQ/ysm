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
}

export default (): Config => ({
  port: process.env.PORT || 3000,
  storyblok: {
    token: process.env.STORYBLOK_TOKEN || missing('STORYBLOK_TOKEN'),
  },
  firebase: {
    serviceAccount: getFirebaseServiceAccount(),
  },
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
