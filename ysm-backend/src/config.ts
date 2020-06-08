function missing(key: string): void {
  throw new Error(`Missing env var: ${key}`);
}

export default () => ({
  storyblok: {
    token: process.env.STORYBLOK_TOKEN || missing('STORYBLOK_TOKEN'),
  },
});
