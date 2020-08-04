function missing(key: string): string {
  throw new Error(`Missing env var: ${key}`);
}

export interface Config {
  port: string | number;
  storyblok: {
    token: string;
  };
  firebase: {
    projectId: string;
  };
}

export default (): Config => ({
  port: process.env.PORT || 3000,
  storyblok: {
    token: process.env.STORYBLOK_TOKEN || missing('STORYBLOK_TOKEN'),
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || missing('FIREBASE_PROJECT_ID'),
  },
});
