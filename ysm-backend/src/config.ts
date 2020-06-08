function missing(key: string): void {
  throw new Error(`Missing env var: ${key}`);
}

export default () => ({
  port: process.env.PORT || 3000,
  storyblok: {
    token: process.env.STORYBLOK_TOKEN || missing('STORYBLOK_TOKEN'),
  },
});
